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
- [ ] Invoca sempre `next()` para não bloquear o fluxo da requisição.
- [ ] Medição de tempo precisa mesmo em rotas assíncronas lentas.
- [ ] Cabeçalho presente nas respostas inspecionadas no Postman/curl.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
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
- [ ] Se o utilizador passar `limit=500`, a API limita automaticamente para 50.
- [ ] Se passar `page` inválida (ex.: texto ou número negativo), assume valor defensivo ou retorna 400.
- [ ] Filtro textual insensível a maiúsculas/minúsculas (*case-insensitive*).

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**
