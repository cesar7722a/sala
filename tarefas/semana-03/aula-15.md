# Tarefas Diárias — Aula 15: Express Router e Organização Modular

- **Data:** 2026-11-26
- **Módulo:** Semana 03 — HTTP, REST e Express.js
- **Objectivo:** Dominar a organização modular de rotas com `express.Router()`, a montagem de Routers, a separação entre rotas e controllers e a aplicação de middlewares em diferentes âmbitos.

---

## Orientações

1. Utiliza TypeScript e Express.
2. Cria pequenos ficheiros dentro de `src/` para testar cada exercício.
3. Testa os endpoints com `curl`, Thunder Client ou Postman.
4. Não concentres todas as soluções num único ficheiro.
5. Não avances sem compreender o percurso da requisição.
6. Assinala `[x]` apenas depois de testar o exercício.

# 🟢 Nível 1 — Fundamentos do Router (1–5)

## Tarefa 01 — Primeiro Router independente

**Objectivo:** Criar e exportar um Router.

**Enunciado:** Cria `src/routes/health.routes.ts`. Utiliza `Router()` para criar uma rota `GET /` que devolve `{ status: "online" }`. Exporta o Router e monta-o em `/health` no servidor principal.

**Dica de arranque:**

```typescript
import { Router } from "express";

const healthRouter = Router();

// Define a rota aqui

export default healthRouter;
```

**Critério:** `GET /health` deve devolver 200.

**A tua solução:**

```typescript
app.use("/health", healthRoutes);

healthRoutes.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ status: "online" });
});
```

- [x] Concluído

---

## Tarefa 02 — Combinação de prefixos

**Objectivo:** Compreender a combinação entre o prefixo e o caminho interno.

**Enunciado:** Cria um Router chamado `studentsRouter`. Define três endpoints:

- `GET /`
- `GET /:id`
- `GET /:id/profile`

Monta-o em `/students`. Identifica os três endpoints finais.

**Dica de arranque:**

```typescript
const studentsRouter = Router();

studentsRouter.get("/", handler);
studentsRouter.get("/:id", handler);

// Continua...
```

**Critério:** Os três endpoints devem funcionar sem repetires `/students` dentro do Router.

**A tua solução:**

```typescript
import { Request, Response, Router } from "express";

const studentsRoutes = Router();

studentsRoutes.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ sucesso: "a funcionar" });
});

studentsRoutes.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    mensagem: "Usuário encontrado",
    id: id,
  });
});

studentsRoutes.get("/:id/profile", (req: Request, res: Response) => {
  res.status(200).json({ sucesso: "podes ver o teu perfil" });
});

export default studentsRoutes;
```

- [x] Concluído

---

## Tarefa 03 — Separação entre Router e Controller

**Objectivo:** Evitar colocar a implementação dos handlers dentro do ficheiro de rotas.

**Enunciado:** Cria:

- `controllers/instructors.controller.ts`
- `routes/instructors.routes.ts`

Implementa `GET /instructors` no Router, mas coloca a função que responde ao pedido no controller.

**Dica de arranque:**

```typescript
// instructors.controller.ts
import type { Request, Response } from "express";

export function getInstructors(req: Request, res: Response) {
  // Implementa a resposta
}
```

```typescript
// instructors.routes.ts
import { Router } from "express";

// Importa o controller e associa-o à rota
```

**Critério:** O Router não deve conter a lógica de resposta.

**A tua solução:**

```typescript
import { Router } from "express";
import { getInstructors } from "../controllers/instructors.controller.js";

const instructorsRouter = Router();

instructorsRouter.get("/", getInstructors);

export default instructorsRouter;

import type { Request, Response } from "express";

export function getInstructors(_req: Request, res: Response) {
  return res.status(200).json({
    sucesso: true,
    data: [
      { id: "1", nome: "Carlos Mendes", especialidade: "Node.js & Backend" },
      { id: "2", nome: "Ana Silva", especialidade: "TypeScript Avançado" },
    ],
  });
}
```

- [x] Concluído

---

## Tarefa 04 — Vários Routers na mesma aplicação

**Objectivo:** Organizar diferentes recursos.

**Enunciado:** Cria três Routers independentes:

- `coursesRouter`
- `lessonsRouter`
- `categoriesRouter`

Cada Router deve possuir uma rota GET `/`. Monta-os respectivamente em `/courses`, `/lessons` e `/categories`.

**Dica de arranque:**

```typescript
app.use("/courses", coursesRouter);
app.use("/lessons", lessonsRouter);

// Monta o terceiro Router
```

**Critério:** Cada recurso deve responder independentemente.

**A tua solução:**

```typescript
// Escreve aqui a montagem dos três Routers
```

- [ ] Concluído

---

## Tarefa 05 — Rota específica e rota dinâmica

**Objectivo:** Compreender possíveis conflitos na definição de caminhos.

**Enunciado:** No `coursesRouter`, cria:

- `GET /featured`
- `GET /:id`
- `GET /:id/reviews`

Organiza as rotas correctamente e explica por que escolheste essa ordem.

**Dica de arranque:**

```typescript
coursesRouter.get("/featured", handler);

// Define depois as rotas dinâmicas
```

**Critério:** `GET /courses/featured` deve executar o handler de cursos destacados, não o de procura por ID.

**A tua solução:**

```typescript
coursesRouter.get("/", getCourses);
coursesRouter.get("/:id", getCoursesById);
coursesRouter.get("/featured", getFeatured);
coursesRouter.get("/:id/reviews", getReviews);
```

quando colocamos a url para featured e entra no /:id porque entende o featured como id

- [x] Concluído

---

# 🟡 Nível 2 — Aplicação e raciocínio (6–10)

## Tarefa 06 — Middleware global e middleware de Router

**Objectivo:** Distinguir o âmbito de aplicação dos middlewares.

**Enunciado:** Cria um middleware global que regista o método e URL. Depois, cria outro middleware aplicado exclusivamente ao `coursesRouter`, que imprime uma mensagem identificando o módulo de cursos.

Testa também um pedido a `/students`.

**Dica de arranque:**

```typescript
app.use(globalLogger);

coursesRouter.use((req, res, next) => {
  // Regista a entrada no módulo
  next();
});
```

**Critério:** O middleware global deve actuar nos dois recursos, mas o middleware de cursos apenas no Router de cursos.

**A tua solução:**

```typescript
// Escreve aqui os dois middlewares
```

- [ ] Concluído

---

## Tarefa 07 — Middleware específico de rota

**Objectivo:** Aplicar uma regra apenas a determinado endpoint.

**Enunciado:** Cria um middleware `adminGuard` que verifica o header `x-admin-key`. Aplica-o exclusivamente a `DELETE /courses/:id`. As restantes rotas de cursos devem continuar acessíveis sem essa chave.

**Dica de arranque:**

```typescript
function adminGuard(req: Request, res: Response, next: NextFunction) {
  const key = req.headers["x-admin-key"];

  // Valida a chave
}
```

**Critério:** A protecção não deve bloquear `GET /courses`.

**A tua solução:**

```typescript
// Escreve aqui o middleware e a sua aplicação
```

- [ ] Concluído

---

## Tarefa 08 — Router com prefixo de API

**Objectivo:** Construir uma API versionada.

**Enunciado:** Cria um `apiRouter` que agrega os Routers de cursos e estudantes. Monta o `apiRouter` em `/api/v1`.

Os endpoints finais devem incluir:

- `/api/v1/courses`
- `/api/v1/students`

**Dica de arranque:**

```typescript
const apiRouter = Router();

apiRouter.use("/courses", coursesRouter);

// Regista o Router de estudantes
```

**Critério:** A versão da API deve ser definida num único local.

**A tua solução:**

```typescript
// Escreve aqui a organização dos Routers
```

- [ ] Concluído

---

## Tarefa 09 — Router de recursos aninhados

**Objectivo:** Organizar recursos relacionados.

**Enunciado:** Cria um Router de aulas com os seguintes endpoints:

- `GET /courses/:courseId/lessons`
- `GET /courses/:courseId/lessons/:lessonId`

Monta-o em `/api/v1`.

**Dica de arranque:**

```typescript
const lessonsRouter = Router();

lessonsRouter.get("/courses/:courseId/lessons", handler);
```

**Critério:** Os dois parâmetros devem chegar correctamente ao controller.

**A tua solução:**

```typescript
// Escreve aqui a tua solução
```

- [ ] Concluído

---

## Tarefa 10 — Diagnóstico de uma aplicação mal organizada

**Objectivo:** Identificar erros de montagem e ordem.

**Enunciado:** Analisa esta configuração:

```typescript
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use("/courses", coursesRouter);

app.use(requestLogger);
```

Identifica pelo menos três problemas e reorganiza os middlewares e Routers.

**Dica de arranque:**

Pensa na ordem em que o Express percorre os elementos registados e no que acontece quando um middleware envia uma resposta sem chamar `next()`.

**Critério:** Explica por que razão o Router e o logger não funcionam como esperado na configuração original.

**A tua solução:**

```typescript
// Escreve a configuração corrigida e a tua análise
```

- [ ] Concluído

---

# 🔴 Nível 3 — Raciocínio avançado (11–13)

## Tarefa 11 — Router com autenticação global

**Objectivo:** Proteger um módulo inteiro.

**Enunciado:** Cria um `adminRouter` montado em `/admin`. Todas as suas rotas devem passar por um middleware de autenticação. Cria dois endpoints: `GET /dashboard` e `GET /reports`.

Sem autenticação válida, nenhum dos dois deve ser executado.

**Dica de arranque:**

```typescript
const adminRouter = Router();

adminRouter.use(authenticateAdmin);

// Define os endpoints
```

**Critério:** A protecção deve estar centralizada no Router, sem repetires o middleware em cada rota.

**A tua solução:**

```typescript
// Escreve aqui a tua solução
```

- [ ] Concluído

---

## Tarefa 12 — Reutilização de um Router em diferentes prefixos

**Objectivo:** Compreender a reutilização de módulos de rotas.

**Enunciado:** Cria um Router de notificações com `GET /` e monta-o em dois prefixos diferentes:

- `/students/notifications`
- `/instructors/notifications`

Explica o que acontece quando cada endpoint é chamado.

**Dica de arranque:**

```typescript
const notificationsRouter = Router();

notificationsRouter.get("/", getNotifications);

// Monta o mesmo Router em dois locais
```

**Critério:** O mesmo conjunto de rotas deve responder nos dois caminhos.

**A tua solução:**

```typescript
// Escreve aqui a solução e a explicação
```

- [ ] Concluído

---

## Tarefa 13 — Router com validação de parâmetros

**Objectivo:** Aplicar validações antes de chegar ao controller.

**Enunciado:** Cria um Router para cursos com `GET /:id`. Implementa um middleware que verifica se o ID recebido é válido segundo uma regra que defines (por exemplo, apenas números). Se for inválido, devolve 400; caso contrário, chama `next()`.

**Dica de arranque:**

```typescript
function validateCourseId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  // Valida o ID e decide se chama next()
}
```

**Critério:** O controller não deve executar quando o ID é inválido.

**A tua solução:**

```typescript
// Escreve aqui o middleware e a rota
```

- [ ] Concluído

---

# 🏆 Nível 4 — Desafios realistas (14–15)

## Tarefa 14 — Refactorização da API de cursos

**Objectivo:** Refactorizar uma API Express já funcional.

**Enunciado:** Imagina que tens uma API de cursos com todas as rotas concentradas em `server.ts`.

Refactoriza-a para a seguinte estrutura:

```text
src/
├── server.ts
├── routes/
│   ├── courses.routes.ts
│   ├── lessons.routes.ts
│   └── students.routes.ts
├── controllers/
│   ├── courses.controller.ts
│   ├── lessons.controller.ts
│   └── students.controller.ts
└── middlewares/
    ├── requestLogger.ts
    └── adminGuard.ts
```

A API deve disponibilizar:

- `GET /api/v1/courses`
- `GET /api/v1/courses/:id`
- `GET /api/v1/courses/featured`
- `GET /api/v1/lessons`
- `GET /api/v1/students`

A rota de eliminação de cursos deve exigir a chave administrativa.

**Dica de arranque:**

Começa pelo `courses.controller.ts`. Depois cria o Router, associa os handlers e só no final monta os Routers no servidor.

**Critérios:**

- [ ] Responsabilidades separadas.
- [ ] Rotas agrupadas por recurso.
- [ ] Middleware administrativo aplicado apenas onde necessário.
- [ ] Endpoints testados.
- [ ] 404 colocado depois dos Routers.

**A tua solução:**

```typescript
// Indica a estrutura implementada e os ficheiros criados.
// Podes colocar aqui partes importantes do código.
```

---

## Tarefa 15 — Desafio Master: Arquitectura Modular da Video-Lessons Platform

**Objectivo:** Construir uma estrutura modular próxima de um projecto real de empresa.

**Enunciado:** Cria uma pequena API com três módulos: cursos, aulas e estudantes.

Requisitos:

1. A aplicação deve possuir um Router principal versionado em `/api/v1`.
2. Cada recurso deve ter o seu próprio Router.
3. Cada Router deve encaminhar os pedidos para os respectivos controllers.
4. Deve existir um middleware global de auditoria.
5. O Router administrativo deve possuir autenticação própria.
6. As rotas mais específicas devem ser registadas antes das dinâmicas quando necessário.
7. Deve existir um middleware 404.
8. Deve existir um middleware global de erros.
9. Deve ser possível adicionar um quarto módulo sem alterar a implementação interna dos módulos existentes.

**Dica de arranque:**

Desenha primeiro a árvore de ficheiros e o percurso de uma requisição:

```text
Cliente HTTP
    |
    v
Express App
    |
    v
Middleware global
    |
    v
/api/v1
    |
    v
Router do recurso
    |
    v
Middleware específico
    |
    v
Controller
    |
    v
Resposta HTTP
```

**Critérios:**

- [ ] API arranca sem erros.
- [ ] Módulos independentes.
- [ ] Routers correctamente montados.
- [ ] Middlewares aplicados nos âmbitos correctos.
- [ ] Tratamento de rotas inexistentes.
- [ ] Tratamento global de erros.
- [ ] Estrutura preparada para crescer.

**A tua solução:**

```typescript
// Regista aqui a arquitectura, decisões técnicas,
// dificuldades e referência ao código implementado.
```

---

## Registo final

- Exercícios concluídos: \_\_\_ / 15
- Maior dificuldade encontrada:
- Conceito que compreendi melhor:
- Conceito que preciso de rever:
- O que consegui aplicar à Video-Lessons Platform:
