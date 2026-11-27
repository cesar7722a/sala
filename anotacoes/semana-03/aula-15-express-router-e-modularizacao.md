# Aula 15 — Organização Profissional de Rotas com Express Router e Separação de Responsabilidades

- **Data:** 2026-11-26
- **Semana:** Semana 03
- **Duração da Sessão:** 90 minutos (15 min revisão | 25 min teoria | 40 min código | 10 min registo)

---

## 1. Tema

Organização profissional de rotas numa aplicação Express utilizando `express.Router()`, com separação das responsabilidades entre ficheiros de rotas, controladores e middlewares.

O objectivo é deixar de concentrar todas as rotas num único ficheiro e começar a estruturar a API de forma modular, organizada e preparada para crescer.

## 2. Objectivos de Aprendizagem

- [ ] Compreender o problema de concentrar todas as rotas num único ficheiro.
- [ ] Compreender o funcionamento interno e a finalidade do `express.Router()`.
- [ ] Criar routers independentes para diferentes recursos da aplicação.
- [ ] Compreender como o prefixo definido em `app.use()` é combinado com os caminhos do router.
- [ ] Separar a definição das rotas da lógica executada pelos controladores.
- [ ] Identificar a diferença entre middlewares globais, de router e específicos de uma rota.
- [ ] Compreender a importância da ordem de declaração das rotas.
- [ ] Organizar uma pequena API Express utilizando uma estrutura modular.

## 3. Pré-requisitos

### Conhecimentos prévios

- Conhecer a arquitectura cliente-servidor e o funcionamento do protocolo HTTP.
- Compreender os métodos HTTP: GET, POST, PUT, PATCH e DELETE.
- Saber criar um servidor utilizando Express.
- Compreender `req`, `res` e `next`.
- Conhecer o funcionamento dos middlewares.
- Saber trabalhar com `req.params`, `req.query` e `req.body`.
- Compreender a finalidade dos códigos de estado HTTP.

### Ferramentas e dependências

- Node.js LTS.
- TypeScript.
- Express.
- `@types/express`.
- `tsx` para executar TypeScript durante o desenvolvimento.
- VS Code.
- Terminal Linux.

Dependências principais:

```bash
npm install express
npm install -D typescript tsx @types/node @types/express
```

## 4. Explicação dos Conceitos

### 4.1. O problema de concentrar todas as rotas num único ficheiro

Imagina que estamos a desenvolver uma API para uma plataforma de cursos em vídeo.

Inicialmente, podemos ter apenas três rotas:

```typescript
app.get("/courses", getCourses);
app.get("/courses/:id", getCourseById);
app.post("/courses", createCourse);
```

Nesta fase, colocar tudo no `server.ts` parece simples e funcional.

Mas a aplicação começa a crescer e surgem novas funcionalidades:

- Cursos.
- Utilizadores.
- Instrutores.
- Inscrições.
- Aulas.
- Pagamentos.

Se continuarmos a colocar todas as rotas no mesmo ficheiro, o `server.ts` começa a acumular responsabilidades diferentes.

Por exemplo:

```typescript
// server.ts

app.get("/courses", getCourses);
app.get("/courses/:id", getCourseById);
app.post("/courses", createCourse);

app.get("/students", getStudents);
app.get("/students/:id", getStudentById);
app.post("/students", createStudent);

app.get("/instructors", getInstructors);
app.get("/instructors/:id", getInstructorById);

app.post("/enrollments", createEnrollment);
```

O problema não é o Express deixar de funcionar. O problema é a organização do código.

À medida que a aplicação cresce:

- Torna-se mais difícil encontrar uma rota específica.
- O ficheiro principal acumula demasiadas responsabilidades.
- A manutenção fica mais complicada.
- A reutilização de middlewares torna-se menos organizada.
- Vários programadores podem precisar de alterar o mesmo ficheiro.

**Ideia fundamental:** uma aplicação pode funcionar correctamente e, mesmo assim, estar mal organizada.

### 4.2. O que é o express.Router()?

O `express.Router()` permite criar um conjunto independente de rotas que pode ser utilizado como um módulo dentro da aplicação Express.

Podemos pensar num Router como um pequeno agrupamento de rotas relacionado com determinado recurso.

Por exemplo:

```text
Aplicação Express
│
├── Router de Cursos
│   ├── GET /
│   ├── GET /:id
│   └── POST /
│
├── Router de Estudantes
│   ├── GET /
│   ├── GET /:id
│   └── POST /
│
└── Router de Instrutores
    ├── GET /
    └── GET /:id
```

Cada Router fica responsável por agrupar as rotas de um determinado domínio.

Criamos um Router através de:

```typescript
import { Router } from "express";

const coursesRouter = Router();

export default coursesRouter;
```

O que está a acontecer?

1. Importamos `Router` a partir do Express.
2. Executamos `Router()` para criar uma nova instância de router.
3. Guardamos essa instância numa constante.
4. Exportamos o router para que possa ser utilizado noutro ficheiro.

O Router não cria um novo servidor HTTP, não abre uma nova porta e não substitui a aplicação Express.

É um agrupamento de rotas e middlewares que será integrado na aplicação principal.

### 4.3. Como registar rotas dentro do Router?

Depois de criar o Router, podemos registar nele as rotas relacionadas com o recurso.

```typescript
import { Router } from "express";

const coursesRouter = Router();

coursesRouter.get("/", (req, res) => {
  res.json({ message: "Lista de cursos" });
});

coursesRouter.get("/:id", (req, res) => {
  res.json({ message: `Curso ${req.params.id}` });
});

coursesRouter.post("/", (req, res) => {
  res.status(201).json({ message: "Curso criado" });
});

export default coursesRouter;
```

Repara numa diferença importante:

No router, não precisamos de repetir `/courses` em todas as rotas.

O router apenas define os caminhos internos do recurso.

O prefixo será definido quando o router for integrado na aplicação principal.

### 4.4. Como funciona a combinação de caminhos?

No `server.ts`, utilizamos `app.use()` para integrar o router:

```typescript
app.use("/courses", coursesRouter);
```

O Express combina o prefixo `/courses` com os caminhos registados dentro do router.

Considera:

```typescript
// server.ts

app.use("/courses", coursesRouter);
```

Dentro de `coursesRouter`:

```typescript
coursesRouter.get("/", getCourses);
coursesRouter.get("/:id", getCourseById);
coursesRouter.post("/", createCourse);
```

O resultado será:

| Caminho no Router | Prefixo da aplicação | Rota final          |
| ----------------- | -------------------- | ------------------- |
| `/`               | `/courses`           | `/courses`          |
| `/:id`            | `/courses`           | `/courses/:id`      |
| `/featured`       | `/courses`           | `/courses/featured` |

Visualmente:

```text
app.use("/courses", coursesRouter)
                  │
                  ▼
          coursesRouter
                  │
          ┌───────┼────────┐
          ▼       ▼        ▼
          /      /:id   /featured
          │       │        │
          ▼       ▼        ▼
       /courses /courses/:id /courses/featured
```

**Atenção:** o prefixo não é automaticamente acrescentado ao texto que escrevemos dentro do router. É durante a integração do router na aplicação que o Express associa os dois caminhos.

### 4.5. Separação entre Routes e Controllers

Uma boa organização consiste em separar a declaração das rotas da lógica responsável por processar os pedidos.

São duas responsabilidades diferentes.

**Routes:**

Define:

- Qual é o método HTTP?
- Qual é o caminho?
- Qual controlador deve ser executado?
- Que middlewares devem ser aplicados?

**Controllers:**

Define:

- O que acontece quando o pedido chega?
- Que dados devem ser consultados?
- Que resposta deve ser enviada?
- Que código de estado HTTP deve ser utilizado?

Exemplo da separação:

```text
src/
│
├── controllers/
│   └── courses.controller.ts
│
├── routes/
│   └── courses.routes.ts
│
└── server.ts
```

No controlador:

```typescript
export function getCourses(req, res) {
  res.json({ message: "Lista de cursos" });
}
```

Na rota:

```typescript
coursesRouter.get("/", getCourses);
```

Desta forma, o ficheiro de rotas não precisa de conhecer todos os detalhes da implementação do controlador.

### 4.6. Os diferentes níveis de middlewares

Os middlewares podem ser aplicados em diferentes níveis da aplicação.

#### A. Middleware global

É registado directamente na aplicação através de `app.use()`.

```typescript
app.use(requestLogger);
```

Será executado nos pedidos que passam pela aplicação depois do ponto em que foi registado, respeitando a ordem dos middlewares e das rotas.

#### B. Middleware ao nível do Router

É registado através de `router.use()`.

```typescript
coursesRouter.use(courseAccessLogger);
```

Aplica-se aos pedidos que passam por esse router, respeitando a sua ordem de declaração.

#### C. Middleware específico de uma rota

É aplicado directamente na declaração de uma rota.

```typescript
coursesRouter.delete("/:id", adminGuard, deleteCourse);
```

Neste exemplo, `adminGuard` é executado antes de `deleteCourse`.

Fluxo:

```text
Pedido HTTP
    │
    ▼
Middleware global
    │
    ▼
Router de cursos
    │
    ▼
Middleware do Router
    │
    ▼
Middleware específico da rota
    │
    ▼
Controller
    │
    ▼
Resposta HTTP
```

Se um middleware não chamar `next()` nem terminar a resposta, o pedido pode ficar pendente.

### 4.7. A importância da ordem das rotas

O Express percorre as rotas registadas e verifica quais correspondem ao pedido recebido.

Por isso, a ordem de declaração pode alterar o comportamento da aplicação.

Considera:

```typescript
coursesRouter.get("/:id", getCourseById);

coursesRouter.get("/featured", getFeaturedCourses);
```

O caminho `/featured` pode ser interpretado pela rota dinâmica `/:id`, porque `featured` corresponde a um segmento de caminho.

Assim, a rota dinâmica pode capturar um pedido que deveria chegar ao controlador dos cursos em destaque.

Uma organização mais segura:

```typescript
coursesRouter.get("/featured", getFeaturedCourses);

coursesRouter.get("/:id", getCourseById);
```

**Regra prática:** declara primeiro as rotas mais específicas e depois as rotas dinâmicas mais genéricas.

### 4.8. Como fica a arquitectura depois da modularização?

```text
Cliente React / Next.js
        │
        │ HTTP Request
        ▼
   Express Application
        │
        ▼
 Middleware Global
        │
        ▼
    Courses Router
        │
        ├── GET /
        ├── GET /featured
        ├── GET /:id
        └── POST /
                │
                ▼
          Controller
                │
                ▼
       Resposta HTTP
```

O `server.ts` passa a ser responsável principalmente pela configuração e inicialização da aplicação.

Os routers agrupam as rotas e os controladores tratam a lógica associada aos pedidos.

Esta separação prepara o projecto para evoluir futuramente para uma arquitectura com Services e Repositories.

## 5. Como Criar do Zero (Anatomia e Esqueleto Passo a Passo)

Vamos criar uma pequena API de cursos, utilizando Express e TypeScript.

### Passo 1: O que importar e de onde vem

No ficheiro `courses.routes.ts`:

```typescript
import { Router } from "express";
import {
  getCourses,
  getCourseById,
  getFeaturedCourses,
} from "../controllers/courses.controller.js";
```

Explicação:

- `Router`: função disponibilizada pelo Express para criar um router.
- `getCourses`: controlador responsável por devolver os cursos.
- `getCourseById`: controlador responsável por procurar um curso pelo identificador.
- `getFeaturedCourses`: controlador responsável por devolver os cursos em destaque.

Nota sobre TypeScript com `NodeNext` e ESM: quando utilizamos imports relativos em ficheiros TypeScript destinados a ser executados como JavaScript ESM, é comum escrever a extensão `.js` no caminho do import. O TypeScript resolve o ficheiro `.ts` correspondente durante a compilação.

### Passo 2: O esqueleto mínimo funcional

Criamos o router:

```typescript
import { Router } from "express";

const coursesRouter = Router();

export default coursesRouter;
```

Este é o esqueleto mínimo.

Agora podemos começar a acrescentar rotas:

```typescript
coursesRouter.get("/", getCourses);
coursesRouter.get("/featured", getFeaturedCourses);
coursesRouter.get("/:id", getCourseById);
```

O router está preparado para agrupar os caminhos relacionados com cursos.

### Passo 3: Anatomia dos parâmetros e retornos

Considera:

```typescript
coursesRouter.get("/:id", getCourseById);
```

Vamos analisar:

- `coursesRouter`: instância do router.
- `.get()`: método utilizado para registar uma rota HTTP GET.
- `"/:id"`: caminho da rota, com um parâmetro dinâmico.
- `getCourseById`: função que será executada quando o pedido corresponder à rota.

O parâmetro `id` ficará disponível através de:

```typescript
req.params.id;
```

Agora considera:

```typescript
app.use("/courses", coursesRouter);
```

- `app`: instância principal do Express.
- `.use()`: regista um middleware ou integra um router.
- `"/courses"`: prefixo associado ao router.
- `coursesRouter`: router que será integrado na aplicação.

O método `Router()` devolve uma instância de router que pode ser exportada e utilizada pela aplicação principal.

### Passo 4: Padrão de uso comum

A estrutura será:

```text
src/
│
├── controllers/
│   └── courses.controller.ts
│
├── middlewares/
│   └── requestLogger.ts
│
├── routes/
│   └── courses.routes.ts
│
└── server.ts
```

Responsabilidades:

| Ficheiro                | Responsabilidade                 |
| ----------------------- | -------------------------------- |
| `server.ts`             | Configurar e iniciar a aplicação |
| `courses.routes.ts`     | Declarar as rotas dos cursos     |
| `courses.controller.ts` | Processar os pedidos dos cursos  |
| `requestLogger.ts`      | Registar informações dos pedidos |

Esta estrutura é uma primeira separação de responsabilidades. Não significa que já tenhamos uma arquitectura completa de Controller-Service-Repository.

## 6. Exemplos de Código Completos

Vamos implementar uma API funcional de cursos, utilizando dados em memória para concentrar a aprendizagem no funcionamento do Router.

### 6.1. Controller — `src/controllers/courses.controller.ts`

```typescript
import type { Request, Response } from "express";

interface Course {
  id: number;
  title: string;
  category: string;
  featured: boolean;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Node.js para Backend",
    category: "Backend",
    featured: true,
  },
  {
    id: 2,
    title: "React Avançado",
    category: "Frontend",
    featured: false,
  },
  {
    id: 3,
    title: "TypeScript Profissional",
    category: "Programming",
    featured: true,
  },
];

export function getCourses(req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    data: courses,
  });
}

export function getCourseById(
  req: Request<{ id: string }>,
  res: Response,
): void {
  const courseId = Number(req.params.id);

  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    res.status(404).json({
      success: false,
      message: "Curso não encontrado",
    });

    return;
  }

  res.status(200).json({
    success: true,
    data: course,
  });
}

export function getFeaturedCourses(req: Request, res: Response): void {
  const featuredCourses = courses.filter((course) => course.featured);

  res.status(200).json({
    success: true,
    data: featuredCourses,
  });
}
```

### 6.2. Routes — `src/routes/courses.routes.ts`

```typescript
import { Router } from "express";

import {
  getCourses,
  getCourseById,
  getFeaturedCourses,
} from "../controllers/courses.controller.js";

const coursesRouter = Router();

// Rotas específicas primeiro
coursesRouter.get("/featured", getFeaturedCourses);

// Rota geral
coursesRouter.get("/", getCourses);

// Rota dinâmica
coursesRouter.get("/:id", getCourseById);

export default coursesRouter;
```

### 6.3. Middleware — `src/middlewares/requestLogger.ts`

```typescript
import type { Request, Response, NextFunction } from "express";

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.log(`[INFO] ${req.method} ${req.originalUrl}`);

  next();
}
```

Este middleware regista o método HTTP e o caminho original do pedido.

Depois de registar a informação, chama `next()` para permitir que o pedido continue.

### 6.4. Servidor principal — `src/server.ts`

```typescript
import express from "express";

import coursesRouter from "./routes/courses.routes.js";
import { requestLogger } from "./middlewares/requestLogger.js";

const app = express();

app.use(express.json());

app.use(requestLogger);

// Router de cursos
app.use("/courses", coursesRouter);

// Rota de saúde da aplicação
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API a funcionar",
  });
});

// Rota para caminhos não encontrados
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada",
  });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Servidor disponível na porta ${PORT}`);
});
```

### 6.5. Testar a aplicação

Executar:

```bash
npx tsx src/server.ts
```

Testar os seguintes pedidos:

| Método | URL                 | Resultado esperado   |
| ------ | ------------------- | -------------------- |
| GET    | `/health`           | Estado da API        |
| GET    | `/courses`          | Lista de cursos      |
| GET    | `/courses/2`        | Curso com ID 2       |
| GET    | `/courses/featured` | Cursos em destaque   |
| GET    | `/courses/999`      | Curso não encontrado |
| GET    | `/students`         | Rota não encontrada  |

Exemplos com curl:

```bash
curl http://localhost:4000/health

curl http://localhost:4000/courses

curl http://localhost:4000/courses/2

curl http://localhost:4000/courses/featured

curl http://localhost:4000/courses/999

curl http://localhost:4000/students
```

**Observações importantes:**

- O `express.json()` deve ser registado antes das rotas que precisam de interpretar corpos JSON.
- O `requestLogger` é global porque foi registado com `app.use()`.
- A rota `/featured` é declarada antes de `/:id` para evitar que seja capturada pela rota dinâmica.
- A resposta 404 é registada depois das rotas, para que só seja utilizada quando nenhuma rota anterior responder.
- Se adicionarmos um middleware global de tratamento de erros, este deve ficar depois das rotas e do middleware 404, conforme a organização adoptada.

## 7. Análise do Funcionamento

### 7.1. O que acontece quando chega um pedido?

Imagina que o cliente executa:

```http
GET /courses/2
```

O fluxo será:

```text
1. O cliente envia GET /courses/2
                │
                ▼
2. O pedido chega à aplicação Express
                │
                ▼
3. express.json() verifica/interpreta o corpo JSON
                │
                ▼
4. requestLogger regista o pedido
                │
                ▼
5. Express verifica o prefixo /courses
                │
                ▼
6. O pedido entra em coursesRouter
                │
                ▼
7. A rota /:id corresponde ao caminho /2
                │
                ▼
8. getCourseById é executado
                │
                ▼
9. req.params.id contém "2"
                │
                ▼
10. O controlador procura o curso
                │
                ▼
11. Express envia a resposta JSON
```

### 7.2. O que acontece com req.params.id?

Embora o identificador represente um número, os parâmetros de caminho são recebidos como texto.

Por isso:

```typescript
const courseId = Number(req.params.id);
```

Converte o valor para número.

Depois:

```typescript
const course = courses.find((item) => item.id === courseId);
```

O método `find()` percorre os elementos do array até encontrar um curso cujo identificador corresponda ao valor procurado.

Se encontrar, devolve o objecto. Caso contrário, devolve `undefined`.

### 7.3. Como o Node.js e o V8 participam neste processo?

O V8 executa o código JavaScript da aplicação.

Quando iniciamos o servidor:

1. O Node.js carrega os módulos necessários.
2. O Express cria a aplicação e os routers.
3. As rotas e os middlewares são registados.
4. O servidor começa a escutar na porta definida.
5. Quando chega um pedido, o Node.js disponibiliza os dados do pedido à aplicação.
6. O Express percorre a cadeia de middlewares e rotas.
7. O controlador executa a lógica e constrói a resposta.

O Router não cria um processo independente nem um novo motor V8.

É uma estrutura de organização e encaminhamento executada dentro da mesma aplicação Node.js.

Neste exemplo, os dados dos cursos estão num array em memória. Não existe consulta à base de dados, pelo que não estamos a estudar ainda o comportamento assíncrono de uma operação de I/O com Prisma ou MySQL.

### 7.4. Potenciais estrangulamentos e armadilhas

**1. Router demasiado grande**

Mesmo com routers separados, um único ficheiro pode acumular demasiadas rotas e lógica auxiliar.

Solução: separar por recursos e responsabilidades.

**2. Rotas dinâmicas antes das específicas**

Uma rota como `/:id` pode capturar caminhos como `/featured`.

Solução: declarar primeiro as rotas específicas.

**3. Middleware sem next() ou resposta**

O pedido pode ficar pendente.

Solução: garantir que cada middleware continua o fluxo, termina a resposta ou encaminha o erro.

**4. Controladores com demasiadas responsabilidades**

Se um controlador tratar directamente de HTTP, regras de negócio, consultas à base de dados e validações complexas, poderá tornar-se difícil de manter.

Solução: evoluir gradualmente para Services e Repositories, que serão estudados na Semana 04.

**5. Confundir Router com servidor**

`express.Router()` não cria uma nova aplicação independente.

Solução: compreender que o router é montado na aplicação principal através de `app.use()`.

## 8. Exercícios Práticos Guiados (com Scaffolding)

### Exercício 1 — Criar um Router de estudantes

**Objectivo:** criar um router independente para o recurso de estudantes.

Estrutura esperada:

```text
src/
├── controllers/
│   └── students.controller.ts
├── routes/
│   └── students.routes.ts
└── server.ts
```

Tarefas:

1. Criar `students.routes.ts`.
2. Importar `Router` do Express.
3. Criar a instância `studentsRouter`.
4. Criar uma rota GET `/`.
5. Integrar o router na aplicação principal com o prefixo `/students`.
6. Testar `GET /students`.

**Dica de arranque:**

```typescript
import { Router } from "express";

const studentsRouter = Router();

// Implementar a rota

export default studentsRouter;
```

### Exercício 2 — Separar rotas e controladores

**Objectivo:** retirar a lógica de uma rota do ficheiro de rotas e colocá-la num controlador.

Tarefas:

1. Criar `students.controller.ts`.
2. Criar uma função `getStudents`.
3. Fazer a função devolver uma lista de estudantes.
4. Importar a função no router.
5. Associar o controlador à rota GET `/`.
6. Confirmar que a resposta continua a funcionar.

**Dica de arranque:**

```typescript
import type { Request, Response } from "express";

export function getStudents(req: Request, res: Response): void {
  // Implementar a resposta
}
```

**O que deves observar:** o ficheiro de rotas deixa de conter a lógica de resposta e passa apenas a definir a associação entre o caminho HTTP e o controlador.

## 9. Desafio Individual

### Desafio — Modularizar uma API de uma plataforma de cursos em vídeo

Imagina que a tua aplicação já possui rotas para cursos, estudantes, instrutores e inscrições.

Actualmente, todas estão concentradas no `server.ts`.

O teu objectivo é reorganizar a aplicação sem alterar o comportamento esperado dos endpoints.

Estrutura pretendida:

```text
src/
│
├── controllers/
│   ├── courses.controller.ts
│   ├── students.controller.ts
│   ├── instructors.controller.ts
│   └── enrollments.controller.ts
│
├── routes/
│   ├── courses.routes.ts
│   ├── students.routes.ts
│   ├── instructors.routes.ts
│   └── enrollments.routes.ts
│
├── middlewares/
│   └── requestLogger.ts
│
└── server.ts
```

Requisitos:

1. Criar um Router para cada recurso.
2. Separar a lógica dos controladores.
3. Integrar cada router com o prefixo correcto.
4. Manter um middleware global de registo de pedidos.
5. Criar uma rota `/health`.
6. Garantir que a rota 404 fica depois dos routers.
7. Garantir que caminhos específicos não são capturados por rotas dinâmicas.
8. Testar os endpoints depois da refactorização.

**Questão de raciocínio:**

Se amanhã a aplicação passar a ter 40 rotas de cursos, 20 de estudantes e 15 de inscrições, por que motivo é melhor manter os recursos separados em routers em vez de concentrar tudo no `server.ts`?

Antes de começar, desenha a estrutura dos ficheiros e define a responsabilidade de cada um.

## 10. Aplicação no Projecto da Empresa

### Contexto: Video-Lessons Platform

Na aplicação da empresa, já existe trabalho relacionado com o catálogo de cursos, filtros, paginação defensiva e tratamento global de erros.

A organização com Express Router permite separar os endpoints por recursos.

Exemplo de organização possível:

```text
src/
│
├── routes/
│   ├── courses.routes.ts
│   ├── lessons.routes.ts
│   ├── users.routes.ts
│   └── enrollments.routes.ts
│
├── controllers/
│   ├── courses.controller.ts
│   ├── lessons.controller.ts
│   ├── users.controller.ts
│   └── enrollments.controller.ts
│
└── server.ts
```

Possíveis aplicações:

- Colocar os filtros e a paginação do catálogo no fluxo das rotas de cursos.
- Separar os endpoints de aulas dos endpoints de cursos.
- Aplicar autenticação ou autorização apenas nos routers que necessitam.
- Manter middlewares globais de logging e tratamento de erros na aplicação principal.
- Facilitar a manutenção e a evolução dos recursos sem concentrar todas as alterações no mesmo ficheiro.

**Benefícios para a aplicação corporativa:**

- Melhor organização do código.
- Menor acoplamento entre recursos.
- Maior facilidade de manutenção.
- Melhor reutilização de middlewares.
- Facilidade de trabalho em equipa.
- Preparação para introduzir Services e Repositories na próxima semana.

**Nota de segurança:** não copiar credenciais, tokens, ficheiros `.env` ou código confidencial da empresa para os apontamentos.

## 11. Dúvidas e Dificuldades

- **Dúvida:** Qual é exactamente a diferença entre uma aplicação Express e uma instância de `express.Router()`?
- **Esclarecimento:** A aplicação Express representa a aplicação principal. O Router agrupa rotas e middlewares que serão integrados nessa aplicação. Não cria outro servidor nem outra porta.

- **Dúvida:** Por que razão utilizamos `app.use("/courses", coursesRouter)` em vez de repetir `/courses` em todas as rotas?
- **Esclarecimento:** O prefixo é associado ao router durante a integração. Assim, os caminhos internos ficam mais curtos e organizados.

- **Dúvida:** Por que razão a rota `/featured` deve aparecer antes de `/:id`?
- **Esclarecimento:** Porque `featured` pode corresponder ao parâmetro dinâmico `id`. A ordem de registo pode fazer com que o pedido chegue ao controlador errado.

- **Dúvida:** Qual é a diferença entre um middleware global e um middleware do Router?
- **Esclarecimento:** O middleware global é registado na aplicação e pode afectar os pedidos que passam por ela. O middleware do Router é aplicado aos pedidos que entram naquele router.

_Esta secção será actualizada com as dúvidas reais que surgirem durante a sessão._

## 12. O que Aprendi

Registar no final da sessão entre 3 e 5 ideias-chave:

- [ ] O `express.Router()` permite agrupar rotas relacionadas com o mesmo recurso.
- [ ] O `app.use()` permite integrar routers e associar-lhes prefixos.
- [ ] Routes e Controllers possuem responsabilidades diferentes.
- [ ] Os middlewares podem ser aplicados globalmente, ao nível do Router ou numa rota específica.
- [ ] A ordem das rotas influencia o encaminhamento dos pedidos.

## 13. Critérios de Conclusão

- [ ] Todos os exemplos de código foram executados e compreendidos.
- [ ] O exercício prático foi concluído com sucesso.
- [ ] O desafio individual foi implementado.
- [ ] Os conceitos foram documentados de forma clara.
- [ ] Consigo explicar o percurso de um pedido desde a aplicação principal até ao controlador.
- [ ] Consigo justificar a separação entre Routes e Controllers.
- [ ] Consigo identificar problemas causados pela ordem incorrecta das rotas.
