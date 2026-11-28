# Aula 17 — Desafio Integrador da Semana 03 e Encerramento da Fase 2 (HTTP, REST e Express.js)

- **Data:** 2026-11-28 (Sábado)
- **Semana:** Semana 03 — Conclusão (9h00 / 9h00 cumpridas)
- **Duração da Sessão:** 90 minutos (15 min revisão de tarefas | 25 min arquitectura do desafio | 40 min código prático | 10 min avaliação e fecho da semana)
- **Objectivo Central:** Consolidar e integrar 100% dos conhecimentos da Semana 03 na API v1 da Plataforma de Vídeo-Aulas, unindo rotas modulares, controllers desacoplados, middlewares em cascata (auditoria, autenticação de admin), filtros de busca, paginação defensiva e tratamento centralizado de erros.

---

## 1. Avaliação e Validação das Tarefas Autónomas (Tarefas 05 a 09)

Durante o teu estudo autónomo, demonstraste uma evolução notável. Vamos analisar o que implementaste:

| Tarefa | Conceito Testado | Avaliação da Tua Solução | Observação Pedagógica |
| :--- | :--- | :--- | :--- |
| **Tarefa 05** | Ordem de Rotas (`/featured` vs `/:id`) | ⭐ **Excelente Diagnóstico!** Identificaste com precisão: *"quando colocamos a url para featured ele entra no /:id porque entende o featured como id"*. | **Ajuste:** Para resolver no código, basta inverter a ordem: colocar `coursesRouter.get("/featured", ...)` **antes** de `coursesRouter.get("/:id", ...)`. |
| **Tarefa 06** | Âmbitos de Middleware (Global vs Router) | ✅ **100% Correcto!** Criaste `globalLogger` no servidor e o middleware de módulo dentro de `coursesRouter.use(...)`. | O `globalLogger` intercepta tudo; o middleware de cursos só dispara quando o caminho pertence a `/courses`. |
| **Tarefa 07** | Middleware de Rota Individual (`adminGuard`) | ✅ **100% Correcto!** Criaste a verificação do cabeçalho `x-admin-key !== "123"` com retorno `403 Forbidden`. | O `adminGuard` foi aplicado cirurgicamente apenas na rota `DELETE /:id`, sem impactar as rotas públicas de consulta. |
| **Tarefa 08** | Router Centralizador (`apiRouter`) | ✅ **Perfeito!** Agrupaste todos os submódulos (`health`, `students`, `instructors`, `courses`, `lessons`, `categories`) em `routes/api.ts` sob `/api/v1`. | Elimina a poluição no `server.ts`. O servidor agora só precisa de uma linha: `app.use("/api/v1", apiRouter)`. |
| **Tarefa 09** | Rotas Aninhadas (*Sub-resources*) | ✅ **Excelente!** Mapeaste `GET /courses/:courseId/lessons` e `GET /courses/:courseId/lessons/:lessonId`. | Modela com perfeição o relacionamento de domínio da nossa plataforma corporativa (um curso contém várias aulas). |

---

## 2. O Desafio Integrador da Semana 03: Video-Platform API v1

O desafio de hoje consiste em fechar a Semana 03 com uma API robusta, pronta para produção, que servirá de alicerce para a Semana 04 (onde introduziremos Services, Repositories e base de dados).

### 2.1. Arquitectura de Ficheiros do Projecto

```text
src/
├── server.ts                       # Ponto de entrada (apenas middlewares globais, montagem da v1 e porta)
├── middlewares/
│   ├── logger.ts                   # Auditoria com temporizador (X-Response-Time em ms com BigInt)
│   ├── adminGuard.ts               # Protecção de rotas administrativas via cabeçalho x-admin-key
│   └── errorHandler.ts             # Middleware global de erros (4 parâmetros)
├── controllers/
│   ├── health.controller.ts        # Status da API e uptime
│   ├── courses.controller.ts       # CRUD de Cursos com busca e paginação defensiva
│   └── lessons.controller.ts       # Listagem e consulta de aulas de um curso
└── routes/
    ├── index.ts                    # Router Centralizador (/api/v1)
    ├── health.routes.ts            # Rotas de saúde (/health)
    ├── courses.routes.ts           # Rotas de cursos (/courses)
    └── lessons.routes.ts           # Rotas de aulas aninhadas (/courses/:courseId/lessons)
```

---

## 3. "Como Criar do Zero" — Scaffolding dos Módulos Integrados

### 3.1. O Guard de Admin Desacoplado (`src/middlewares/adminGuard.ts`)
```typescript
import type { Request, Response, NextFunction } from "express";

export function adminGuard(req: Request, res: Response, next: NextFunction) {
  const adminKey = req.headers["x-admin-key"];

  if (adminKey !== "secret123") {
    return res.status(403).json({
      success: false,
      error: "Acesso negado: cabeçalho 'x-admin-key' inválido ou ausente.",
    });
  }

  return next();
}
```

### 3.2. As Rotas de Cursos com Ordem Segura (`src/routes/courses.routes.ts`)
```typescript
import { Router } from "express";
import {
  getCourses,
  getFeaturedCourses,
  getCourseById,
  createCourse,
  deleteCourse,
} from "../controllers/courses.controller.js";
import { adminGuard } from "../middlewares/adminGuard.js";

const coursesRouter = Router();

// 1. Rotas estáticas específicas PRIMEIRO (evita conflito com :id)
coursesRouter.get("/featured", getFeaturedCourses);

// 2. Rotas gerais e com parâmetros
coursesRouter.get("/", getCourses);
coursesRouter.get("/:id", getCourseById);

// 3. Rotas de modificação (com adminGuard na eliminação)
coursesRouter.post("/", createCourse);
coursesRouter.delete("/:id", adminGuard, deleteCourse);

export default coursesRouter;
```

### 3.3. O Router Centralizador (`src/routes/index.ts`)
```typescript
import { Router } from "express";
import healthRouter from "./health.routes.js";
import coursesRouter from "./courses.routes.js";

const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/courses", coursesRouter);

export default apiRouter;
```

---

## 4. Critérios de Avaliação do Desafio Integrador

- [ ] Todas as rotas acessíveis através do prefixo `/api/v1`.
- [ ] Listagem de cursos (`GET /api/v1/courses`) responde com paginação defensiva (`page`, `limit`, `totalItems`, `totalPages`) e aceita filtro de busca textual (`?search=node`).
- [ ] Rota de destaque (`GET /api/v1/courses/featured`) responde aos destaques sem ser interceptada por `/:id`.
- [ ] Eliminação (`DELETE /api/v1/courses/:id`) sem o cabeçalho `x-admin-key: secret123` retorna status **403 Forbidden**. Com o cabeçalho, retorna status **204 No Content**.
- [ ] Rotas inexistentes retornam status **404 Not Found** com JSON padronizado.
- [ ] Disparar um erro interno na aplicação é interceptado pelo middleware de 4 argumentos sem crashar o processo Node.js.
- [ ] `npm run build` compila com **0 erros de TypeScript**.
