# Exercícios — Semana 03: Protocolo HTTP, REST e Express.js

---

## Exercício 3.1: CRUD Básico de Recursos com Express e TypeScript (Básico)

### Enunciado
Constrói uma API RESTful simples para gestão de tarefas (*Tasks*). A API deve suportar as 5 operações fundamentais: listar todas as tarefas, obter tarefa por ID, criar nova tarefa, actualizar tarefa existente e eliminar tarefa.

### Objectivo
Praticar roteamento com `express.Router()`, manipulação de status codes e tipagem básica de `Request` e `Response`.

### Conceitos Envolvidos
- Métodos HTTP (GET, POST, PUT/PATCH, DELETE).
- Status codes adequados: 200, 201, 204, 400, 404.
- `req.params`, `req.body`.

### Requisitos
1. Entidade Task: `{ id: string, title: string, completed: boolean, createdAt: Date }`.
2. Armazenamento em memória (array tipado).
3. Respostas no formato JSON consistente.
4. Retornar status 404 com mensagem descritiva caso o ID pesquisado não exista.

### Critérios de Avaliação
- [x] Retorna status 201 Created na criação com a entidade gerada.
- [x] Retorna status 204 No Content na eliminação.
- [x] Parâmetros e retornos devidamente tipados em TypeScript.

### Espaço para Solução e Observações
```typescript
import express, { Request, Response } from "express";
import process from "node:process";

export interface Course {
  id: string;
  title: string;
  price: number;
  instructorId: number;
  createdAt: Date;
}

const courses: Course[] = [
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

// GET /health
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

// GET /courses
app.get("/courses", (_req: Request, res: Response) => {
  res.status(200).json(courses);
});

// GET /courses/:id
app.get("/courses/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const course = courses.find((e) => e.id === id);

  if (!course) {
    return res.status(404).json({ error: `Curso com ID '${id}' não encontrado!` });
  }

  return res.status(200).json(course);
});

// POST /courses
app.post("/courses", (req: Request, res: Response) => {
  const { title, price, instructorId } = req.body;

  if (!title || typeof price !== "number" || !instructorId) {
    return res.status(400).json({
      error: "Campos obrigatórios inválidos: 'title', 'price' e 'instructorId' são necessários.",
    });
  }

  const newCourse: Course = {
    id: String(Date.now()),
    title,
    price,
    instructorId,
    createdAt: new Date(),
  };

  courses.push(newCourse);
  return res.status(201).json(newCourse);
});

// DELETE /courses/:id
app.delete("/courses/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = courses.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Curso com ID '${id}' não encontrado!` });
  }

  courses.splice(index, 1);
  return res.status(204).send();
});
```
**Observações e Aprendizados:**
1. **Middleware `express.json()`:** Sem este middleware registado antes das rotas, qualquer requisição POST com corpo JSON resulta em `req.body === undefined`.
2. **Status Codes Semânticos:** Uso rigoroso de `201 Created` para novas criações e `204 No Content` com `.send()` vazio para deleções bem-sucedidas.
3. **Parâmetros de Rota (`:id`):** A barra `/` antes de `:id` é mandatória para delimitar o segmento da URL.

---

## Exercício 3.2: Middleware de Auditoria e Medição de Performance (Intermédio)

### Enunciado
Implementa um middleware global que intercepta cada pedido recebido, regista o método HTTP, URL de destino e mede o tempo exacto de execução da resposta em milissegundos, adicionando o cabeçalho personalizado `X-Response-Time` na resposta.

### Objectivo
Compreender a cadeia de middlewares do Express, ciclo de vida do evento `res.on('finish')` e manipulação de cabeçalhos HTTP.

### Conceitos Envolvidos
- Assinatura de middleware: `(req: Request, res: Response, next: NextFunction)`.
- `process.hrtime()` ou `performance.now()`.
- Modificação de cabeçalhos de resposta com `res.setHeader()`.

### Requisitos
1. Criar o middleware `requestLoggerAndTimer`.
2. Registar na consola quando o pedido inicia e quando termina, com o status final retornado.
3. Injectar o cabeçalho `X-Response-Time: XXms`.

### Critérios de Avaliação
- [x] Invoca sempre `next()` para não bloquear o fluxo da requisição.
- [x] Medição de tempo precisa mesmo em rotas assíncronas lentas.
- [x] Cabeçalho presente nas respostas inspecionadas no Postman/curl.

### Espaço para Solução e Observações
```typescript
import { Request, Response, NextFunction } from "express";
import process from "node:process";

export function requestLoggerAndTimer(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = process.hrtime.bigint();

  const originalSend = res.send;
  res.send = function (body) {
    const end = process.hrtime.bigint();
    const durationMs = (Number(end - start) / 1_000_000).toFixed(2);

    res.setHeader("X-Response-Time", `${durationMs}ms`);
    return originalSend.call(this, body);
  };

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const durationMs = (Number(end - start) / 1_000_000).toFixed(2);

    const statusEmoji = res.statusCode >= 400 ? "❌" : "✅";
    console.log(
      `${statusEmoji} [${req.method}] ${req.originalUrl} -> Status ${res.statusCode} (Duração: ${durationMs}ms)`
    );
  });

  next();
}
```
**Observações e Aprendizados:**
1. **Invocação Mandatória de `next()`:** Se `next()` não for invocado, a esteira de execução é interrompida e a requisição congela indefinidamente.
2. **Precisão de Nanossegundos (`process.hrtime.bigint`):** Utilizar `bigint` permite obter a diferença real sem perda de precisão em operações de frações de milissegundo.
3. **Injeção de Cabeçalho antes do Envio:** Modificar o método `res.send` intercepta a saída e define `res.setHeader("X-Response-Time", ...)` antes de o Express começar a despejar os bytes na rede.
**Observações e Aprendizados:**

---

## Exercício 3.3: Filtros Avançados e Paginação Defensiva via Query Strings (Avançado)

### Enunciado
Expande o endpoint de listagem de tarefas (`GET /tasks`) para aceitar parâmetros opcionais de consulta: `page`, `limit`, `status` (apenas tarefas concluídas ou pendentes) e `search` (busca no título). A aplicação deve sanitizar os limites para evitar que o cliente solicite 1 milhão de registos de uma só vez.

### Objectivo
Lidar de forma segura com `req.query`, conversão de tipos de dados de strings para números e cálculo de paginação (*offset* e *limit*).

### Conceitos Envolvidos
- `req.query` e conversão de strings numéricas.
- Paginação com metadados (`page`, `limit`, `totalItems`, `totalPages`).
- Definição de limites padrão (ex.: máximo de 50 itens por página).

### Requisitos
1. Validar e converter `page` e `limit` para inteiros positivos.
2. Definir valor padrão: `page = 1`, `limit = 10`, `maxLimit = 50`.
3. Retornar estrutura padronizada:
   ```json
   {
     "data": [...],
     "pagination": { "page": 1, "limit": 10, "total": 42, "totalPages": 5 }
   }
   ```

### Critérios de Avaliação
- [x] Se o utilizador passar `limit=500`, a API limita automaticamente para 50.
- [x] Se passar `page` inválida (ex.: texto ou número negativo), assume valor defensivo ou retorna 400.
- [x] Filtro textual insensível a maiúsculas/minúsculas (*case-insensitive*).

### Espaço para Solução e Observações
```typescript
app.get("/courses", (req: Request, res: Response) => {
  // 1. Extração e sanitização dos parâmetros de consulta (req.query)
  const search =
    typeof req.query.search === "string" ? req.query.search.toLowerCase() : "";
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;

  // Validação Fail-Fast: se minPrice > maxPrice, lança erro para o middleware global
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    throw new Error("O preço mínimo não pode ser superior ao preço máximo!");
  }

  // 2. Paginação defensiva (padrão: página 1, limite 5; limite máximo de segurança: 20)
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(20, Math.max(1, Number(req.query.limit) || 5));

  // 3. Aplicação dos filtros dinâmicos
  let filteredCourses = courses;

  if (search) {
    filteredCourses = filteredCourses.filter((c) =>
      c.title.toLowerCase().includes(search)
    );
  }

  if (minPrice !== undefined) {
    filteredCourses = filteredCourses.filter((c) => c.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    filteredCourses = filteredCourses.filter((c) => c.price <= maxPrice);
  }

  // 4. Corte de paginação com slice
  const startIndex = (page - 1) * limit;
  const paginatedData = filteredCourses.slice(startIndex, startIndex + limit);

  // 5. Resposta padronizada com metadados para o Frontend (React/Next.js)
  return res.status(200).json({
    page,
    limit,
    totalItems: filteredCourses.length,
    totalPages: Math.ceil(filteredCourses.length / limit),
    data: paginatedData,
  });
});

// Middleware Global de Tratamento de Erros (4 argumentos)
app.use((err: Error, _req: Request, res: Response, _next: express.NextFunction) => {
  console.error("💥 [Erro Global Capturado]:", err.message);

  return res.status(400).json({
    error: "Erro na requisição",
    details: err.message,
    timestamp: new Date().toISOString(),
  });
});
```
**Observações e Aprendizados:**
1. **Cast de Tipos em `req.query`:** Todos os valores chegam como strings. O cast defensivo `Number(req.query.page) || 1` associado ao `Math.max(1, ...)` protege contra valores negativos, zero ou caracteres inválidos.
2. **Prevenção de Abuso de Memória:** O uso de `Math.min(20, ...)` impede que o cliente solicite arrays gigantescos, mantendo o tempo de resposta da API previsível.
3. **Tratamento Centralizado de Erros:** Disparar `throw new Error(...)` dentro da rota é capturado pelo middleware de 4 argumentos `(err, req, res, next)`, centralizando o formato da resposta de erro JSON e impedindo o crash do processo Node.js.
