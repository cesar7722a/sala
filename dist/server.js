import express from "express";
import process from "node:process";
import { requestLoggerAndTimer } from "./middlewares/logger.js";
// 2. Base de Dados em memória (Array tipado para testes iniciais)
const courses = [
    {
        id: "1",
        title: "Fundamentos de Node.js e TypeScript",
        price: 15000,
        instructorId: 101,
        createdAt: new Date(),
    },
];
export const app = express();
app.use(express.json());
app.use(requestLoggerAndTimer);
app.get("/health", (_req, res) => {
    res
        .status(200)
        .json({ status: "healthy", timestamp: new Date().toISOString() });
});
app.get("/courses", (_req, res) => {
    res.status(200).json(courses);
});
app.get("/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = courses.find((e) => e.id === id);
    if (!course) {
        return res
            .status(404)
            .json({ error: `Curso com ID '${id}' não encontrado!` });
    }
    return res.status(200).json(course);
});
app.post("/courses", (req, res) => {
    const { title, price, instructorId } = req.body;
    // Validação Fail-Fast de entrada
    if (!title || typeof price !== "number" || !instructorId) {
        return res.status(400).json({
            error: "Campos obrigatórios inválidos: 'title' (string), 'price' (number) e 'instructorId' (number) são necessários.",
        });
    }
    const newCourse = {
        id: String(Date.now()),
        title,
        price,
        instructorId,
        createdAt: new Date(),
    };
    courses.push(newCourse);
    // Status 201 Created é obrigatório na criação de recursos REST
    return res.status(201).json(newCourse);
});
// DELETE /courses/:id — Eliminar curso
app.delete("/courses/:id", (req, res) => {
    const { id } = req.params;
    const index = courses.findIndex((c) => c.id === id);
    if (index === -1) {
        return res
            .status(404)
            .json({ error: `Curso com ID '${id}' não encontrado!` });
    }
    courses.splice(index, 1);
    // Status 204 No Content: Sucesso absoluto, sem corpo de resposta
    return res.status(204).send();
});
// tarefa aula 13
// 4. Arranque do Servidor
const PORT = 3333;
const isMain = process.argv[1]?.endsWith("server.ts");
if (isMain) {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor Express da Plataforma a correr em http://localhost:${PORT}`);
        console.log(`📡 Endpoints disponíveis:`);
        console.log(`   - GET    /health`);
        console.log(`   - GET    /courses`);
        console.log(`   - GET    /courses/:id`);
        console.log(`   - POST   /courses`);
        console.log(`   - DELETE /courses/:id`);
    });
}
