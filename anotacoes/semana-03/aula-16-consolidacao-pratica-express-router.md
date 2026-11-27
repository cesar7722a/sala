# Aula 16 — Consolidação Prática: Domínio de Express Router, Arquitectura Modular e Resolução Guiada

- **Data:** 2026-11-27
- **Semana:** Semana 03 — Protocolo HTTP, REST e Express.js
- **Duração da Sessão:** 90 minutos (15 min revisão e modelo mental | 35 min análise de tarefas e anatomia | 30 min código guiado | 10 min registo e fecho)
- **Objectivo Central:** Consolidar a 100% os conceitos de modularização com `express.Router()`, separação entre rotas e controllers, âmbitos de middlewares e resolução prática das tarefas para garantir alinhamento perfeito com a arquitectura corporativa da nossa Plataforma de Vídeo-Aulas.

---

## 1. Por que esta sessão de consolidação é crucial?

No desenvolvimento Backend, **escrever código que funciona** é apenas metade do trabalho. A outra metade é **organizar o código de forma sustentável**, para que a equipa possa adicionar 50 novos recursos sem que a aplicação se torne um labirinto inavegável.

Ao passares de Frontend para Backend, o teu cérebro já está habituado a componentes (`<Button />`, `<Card />`). No Express, os **Routers** são exactamente os teus "componentes de infra-estrutura":
- Cada Router cuida exclusivamente de um recurso (`/courses`, `/lessons`, `/students`, `/health`).
- Cada Controller cuida exclusivamente de receber os dados do protocolo HTTP, executar a regra e devolver o status code semântico.
- Cada Middleware cuida de inspecionar, proteger ou transformar a requisição no momento exacto do fluxo.

---

## 2. Verificação de Alinhamento: A Folha de Tarefas 15 alinha com as nossas metas?

**A resposta é: Sim, a 100%.** 

A folha de tarefas de [`tarefas/semana-03/aula-15.md`](file:///home/cesar-antonio/Documentos/projectos/nodejs-backend-roadmap/tarefas/semana-03/aula-15.md) foi desenhada com progressão milimétrica para cobrir as competências exactas que vais precisar na **Semana 04 (Arquitectura Controller-Service-Repository e SOLID)**:

| Bloco de Tarefas | Foco Técnico | Por que é vital para a Plataforma de Vídeo-Aulas? |
| :--- | :--- | :--- |
| **Tarefas 01 a 05 (Nível 1)** | Sintaxe do `Router()`, prefixos e ordem de rotas (`/featured` vs `/:id`). | Impede o bug clássico de o Express confundir rotas estáticas com parâmetros dinâmicos na listagem de cursos. |
| **Tarefas 06 a 10 (Nível 2)** | Âmbitos de middlewares: Global vs Router-level vs Route-level, encadeamento e rotas aninhadas (`/courses/:courseId/lessons`). | Permite proteger rotas de instrutores ou validar permissões de alunos antes que o controller seja executado. |
| **Tarefas 11 a 13 (Nível 3)** | 404 modular, reaproveitamento de rotas e validação defensiva de parâmetros. | Garante que IDs inválidos (ex.: texto onde se espera número) sejam rejeitados com `400 Bad Request` antes de sobrecarregar a memória. |
| **Tarefas 14 e 15 (Nível 4)** | Versionamento `/api/v1` e orquestração do catálogo corporativo. | É a estrutura exacta que qualquer empresa moderna (Node/TypeScript) exige em produção. |

---

## 3. Guia de Bolso: "Como Criar do Zero" (Scaffolding Sem Bloqueios)

### 3.1. Anatomia do Router com Controller Desacoplado

```text
[Cliente HTTP] 
      │ 
      ▼ (GET /courses/featured)
[src/server.ts] ──> app.use("/courses", coursesRouter)
                          │
                          ▼ (prefixo removido, resta "/featured")
[src/routes/courses.routes.ts] ──> coursesRouter.get("/featured", getFeaturedCourses)
                                         │
                                         ▼ (executa a função pura)
[src/controllers/courses.controller.ts] ──> export function getFeaturedCourses(req, res)
```

#### Passo 1: O Controller (`src/controllers/exemplo.controller.ts`)
```typescript
import type { Request, Response } from "express";

export function listarRecurso(req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    data: [],
  });
}
```

#### Passo 2: O Router (`src/routes/exemplo.routes.ts`)
```typescript
import { Router } from "express";
import { listarRecurso } from "../controllers/exemplo.controller.js";

const exemploRouter = Router();

// A rota interna é apenas "/" porque o prefixo "/exemplo" é dado no server.ts
exemploRouter.get("/", listarRecurso);

export default exemploRouter;
```

#### Passo 3: O Ponto de Entrada (`src/server.ts`)
```typescript
import express from "express";
import exemploRouter from "./routes/exemplo.routes.js";

const app = express();
app.use(express.json());

// Montagem modular com prefixo
app.use("/exemplo", exemploRouter);

app.listen(3333);
```

---

## 4. As 3 Regras de Ouro que Eliminam 99% das Dúvidas

1. **A Regra da Barra e do Prefixo:**
   - Se no `server.ts` tens `app.use("/students", studentsRouter)`, dentro de `studentsRouter.get("/profile")`, a URL final no navegador é `/students/profile`. **Nunca escrevas `/students` duas vezes!**
2. **A Ordem das Rotas:**
   - As rotas específicas (`/featured`, `/stats`, `/export`) devem ser sempre registadas **antes** das rotas dinâmicas (`/:id`). Caso contrário, o Express interpretará a palavra `"featured"` como o parâmetro `id`!
3. **Os Três Níveis de Middlewares:**
   - **Global (`app.use(middleware)`):** Executa para rigorosamente todas as requisições da aplicação (ex.: Logger, CORS, JSON parser).
   - **No Router (`router.use(middleware)`):** Executa apenas para as rotas daquele router específico (ex.: verificar se o utilizador tem permissão de instrutor nas rotas de cursos).
   - **Na Rota (`router.get("/admin", middleware, handler)`):** Executa apenas para aquele endpoint exacto.

---

## 5. Roteiro Prático da Sessão de Hoje

Vamos resolver juntos os padrões mais importantes de `tarefas/semana-03/aula-15.md` directamente no teu ficheiro `resolucao-tarefas/semana-03/tarefa-aula-15.ts`:

1. **Tarefa 02:** Criação de `studentsRouter` com prefixos (`/`, `/:id`, `/:id/profile`).
2. **Tarefa 03 & 04:** Separação entre Controllers e Routers de Múltiplos Recursos (`courses`, `lessons`, `categories`).
3. **Tarefa 05:** Teste prático do conflito entre `/featured` e `/:id`.
4. **Tarefa 06 & 07:** Middlewares em cascata (Global -> Router -> Rota) com medição de execução.
5. **Tarefa 10:** O padrão do Router Centralizador (`routes/index.ts`).
