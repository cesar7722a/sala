# Tarefas Diárias — Aula 12: Protocolo HTTP, REST e Servidor Express

- **Data da Aula:** 2026-11-23 (Segunda-feira)
- **Módulo:** Semana 03 — Protocolo HTTP, REST e Express.js
- **Objectivo:** Praticar exaustivamente a criação de rotas, manipulação de `req` e `res`, status codes semânticos e parâmetros (`params`, `query`, `body`).

---

## 🧭 Orientações para a Prática Diária

1. Resolve cada exercício criando pequenos ficheiros de teste na pasta `src/` ou testando directamente via cliente HTTP (como Thunder Client, Postman ou comandos `curl`).
2. Para cada exercício, tens o **Ponto de Partida / Dica de Construção** para saberes por onde começar.
3. Não tenhas pressa: faz os exercícios um a um, valida a resposta no terminal ou navegador e assinala o critério `[x]` ao concluir.

---

# 🟢 Nível 1: Fundamentos e Sintaxe Básica (Exercícios 1 a 5)

---

### Tarefa 01: Rota Simples com Resposta JSON Estruturada

- **Objectivo:** Praticar a criação de rotas GET e o envio de JSON com `res.json()`.
- **Enunciado:** Cria uma rota `GET /api/v1/info` que retorna um objecto JSON com as informações da tua aplicação: `{ name: "Video Platform API", version: "1.0.0", author: "Teu Nome" }`.
- **Dica de Arranque:**
  ```typescript
  app.get("/api/v1/info", (_req: Request, res: Response) => {
    res.status(200).json({
      /* teus dados aqui */
    });
  });
  ```
- **Critérios de Avaliação:**
  - [x] Retorna status 200 OK.
  - [x] Resposta com cabeçalho `Content-Type: application/json`.
- **O Teu Código / Solução:**

```typescript
app.get("/api/v1/info", (_req: Request, res: Response) => {
  res
    .status(200)
    .json({ name: "Video Platform API", version: "1.0.0", author: "Teu Nome" });
});
```

---

### Tarefa 02: Endpoint de Verificação com Timestamp Dinâmico (`Ping / Pong`)

- **Objectivo:** Manipulação de datas no formato ISO e envio de respostas de saúde.
- **Enunciado:** Cria a rota `GET /ping` que devolve `{ message: "pong", serverTime: new Date().toISOString() }`.
- **Critérios de Avaliação:**
  - [x] Status code 200 OK.
  - [x] A data é dinâmica a cada chamada.
- **O Teu Código / Solução:**

```typescript
app.get("/ping", (_req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "pong", serverTime: new Date().toISOString() });
});
```

---

### Tarefa 03: Status `201 Created` com Cabeçalho Customizado

- **Objectivo:** Entender a semântica do método POST e status codes de criação.
- **Enunciado:** Cria uma rota `POST /test-created` que recebe qualquer corpo e devolve status `201 Created` juntamente com a mensagem `{ success: true, id: "item-123" }`.
- **Dica de Arranque:** Utiliza `res.status(201).json(...)`.
- **Critérios de Avaliação:**
  - [x] Responde obrigatoriamente com status 201 (e nunca 200).
- **O Teu Código / Solução:**

```typescript
app.post("/test-created", (req: Request, res: Response) => {
  const { name, email, id } = req.body;
  res.status(201).json({ success: true, id, email, name });
});
```

---

### Tarefa 04: Status `204 No Content` sem Corpo

- **Objectivo:** Praticar a resposta vazia padrão para deleções ou operações sem retorno.
- **Enunciado:** Cria uma rota `DELETE /clear-session` que não retorna nenhum JSON, respondendo apenas com status `204` e finalizando a requisição com `.send()`.
- **Dica de Arranque:** Lembra-te de que `res.status(204).send()` não envia dados no corpo.
- **Critérios de Avaliação:**
  - [x] Status 204 verificado.
  - [x] Nenhum conteúdo no corpo da resposta.
- **O Teu Código / Solução:**

```typescript
app.delete("/clear-session", (_req: Request, res: Response) => {
  res.status(204).send();
});
```

---

### Tarefa 05: Middleware Catch-All para Rotas Inexistentes (404)

- **Objectivo:** Capturar qualquer URL digitada errada que não corresponda a nenhuma rota registrada.
- **Enunciado:** Adiciona um middleware no final de todas as rotas do Express que devolve `404 Not Found` com `{ error: "Rota não encontrada", path: req.originalUrl }`.
- **Dica de Arranque:**
  ```typescript
  app.use((req: Request, res: Response) => {
    res
      .status(404)
      .json({ error: "Rota não encontrada", path: req.originalUrl });
  });
  ```
- **Critérios de Avaliação:**
  - [ ] Qualquer rota inválida (ex.: `/rota-fantasma`) recebe status 404 e o JSON padronizado.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```

---

# 🟡 Nível 2: Parâmetros e Validação de Requisições (Exercícios 6 a 10)

---

### Tarefa 06: Leitura de Route Parameters (`req.params`)

- **Objectivo:** Capturar IDs na URL.
- **Enunciado:** Cria uma lista em memória de instrutores `const instructors = [{ id: "1", name: "Carlos" }, { id: "2", name: "Ana" }]`. Cria o endpoint `GET /instructors/:id` que busca pelo ID. Se não encontrar, retorna `404`.
- **Critérios de Avaliação:**
  - [ ] `req.params.id` capturado correctamente.
  - [ ] Retorna `200` com os dados do instrutor ou `404` se o ID não existir.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```

---

### Tarefa 07: Parâmetros de Rota Aninhados (Recursos Dependentes)

- **Objectivo:** Modelar rotas REST com relacionamentos pai-filho.
- **Enunciado:** Cria a rota `GET /courses/:courseId/lessons/:lessonId`. A rota deve devolver um JSON com `{ courseId, lessonId, message: "A carregar aula..." }`.
- **Dica de Arranque:** Desestrutura ambos de `req.params`: `const { courseId, lessonId } = req.params;`.
- **Critérios de Avaliação:**
  - [ ] Ambos os parâmetros são extraídos e devolvidos com sucesso.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```

---

### Tarefa 08: Filtros com Query Parameters (`req.query`)

- **Objectivo:** Capturar filtros de busca opcionais após o `?` na URL.
- **Enunciado:** Cria a rota `GET /search-courses` que lê os query parameters `categoria` e `nivel`. Ex.: `GET /search-courses?categoria=backend&nivel=iniciante`. Devolve os filtros aplicados no JSON.
- **Dica de Arranque:**
  ```typescript
  const { categoria, nivel } = req.query;
  ```
- **Critérios de Avaliação:**
  - [ ] Funciona quando os parâmetros são informados e também quando são omitidos.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```

---

### Tarefa 09: Validação Defensiva de Payload (`req.body`)

- **Objectivo:** Validar tipos e campos obrigatórios antes de processar.
- **Enunciado:** Cria a rota `POST /instructors` que recebe `{ name: string, email: string }`. Se `name` ou `email` faltarem ou não forem strings, devolve `400 Bad Request` com `{ error: "Campos obrigatórios inválidos" }`. Se estiver correcto, devolve `201 Created`.
- **Critérios de Avaliação:**
  - [ ] Rejeita payload vazio com 400.
  - [ ] Aceita payload correcto com 201.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```

---

### Tarefa 10: Actualização Completa com PUT

- **Objectivo:** Implementar a semântica de substituição com o método PUT.
- **Enunciado:** Na rota `PUT /courses/:id`, recebe `{ title: string, price: number }`. Actualiza todos os campos do curso correspondente no array em memória. Se o ID não existir, retorna `404`.
- **Critérios de Avaliação:**
  - [ ] Modifica o registo em memória.
  - [ ] Retorna o registo totalmente actualizado com status 200.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```

---

# 🔴 Nível 3: Casos Reais da Plataforma de Cursos (Exercícios 11 a 15)

---

### Tarefa 11: Actualização Parcial com PATCH e Regra de Negócio

- **Objectivo:** Praticar o método PATCH para alterações parciais com regras de validação.
- **Enunciado:** Cria a rota `PATCH /courses/:id/price` que recebe apenas `{ price: number }`. Se o preço for menor ou igual a zero, retorna `400 Bad Request` com `{ error: "O preço deve ser superior a zero!" }`. Caso contrário, actualiza o curso e devolve 200.
- **Critérios de Avaliação:**
  - [ ] Valida número positivo.
  - [ ] Actualiza apenas o preço sem alterar os outros campos do curso.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```

---

### Tarefa 12: Paginação Defensiva em Rota GET

- **Objectivo:** Evitar que o cliente sobrecarregue a API pedindo milhares de registos de uma vez.
- **Enunciado:** Na rota `GET /catalog`, lê `page` e `limit` de `req.query`. Define valores padrão: `page = 1` e `limit = 2`. Limita o `limit` máximo a 5 itens por página. Utiliza `.slice()` no array de cursos para devolver apenas a página solicitada.
- **Critérios de Avaliação:**
  - [ ] Devolve a quantidade certa de itens calculada com `(page - 1) * limit`.
  - [ ] Responde com metadados `{ page, limit, total: courses.length, data: [...] }`.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```

---

### Tarefa 13: Inspecção de Headers Customizados (Simulação de Autenticação Básica)

- **Objectivo:** Ler e validar cabeçalhos HTTP com `req.headers`.
- **Enunciado:** Cria a rota `POST /admin/courses`. A rota só pode ser executada se o cliente enviar o cabeçalho `x-admin-key: segredo123`. Se o cabeçalho estiver ausente ou errado, retorna `401 Unauthorized` com `{ error: "Acesso administrativo negado!" }`.
- **Dica de Arranque:**
  ```typescript
  const adminKey = req.headers["x-admin-key"];
  if (adminKey !== "segredo123") {
    return res.status(401).json({ error: "Acesso administrativo negado!" });
  }
  ```
- **Critérios de Avaliação:**
  - [ ] Requisição sem o header recebe status 401.
  - [ ] Requisição com o header correcto passa e executa a acção.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```

---

### Tarefa 14: Relacionamento de Entidades (Matrícula de Aluno)

- **Objectivo:** Validação cruzada entre recursos diferentes antes da criação.
- **Enunciado:** Cria uma rota `POST /enrollments` que recebe `{ studentId: number, courseId: string }`. Verifica se o `courseId` realmente existe na tua lista de cursos. Se não existir, devolve `404 Not Found` com `{ error: "Curso informado não existe!" }`. Se existir, cria a matrícula com status `201 Created`.
- **Critérios de Avaliação:**
  - [ ] Não permite matricular em curso inexistente.
  - [ ] Devolve a matrícula criada com data e status `201`.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```

---

### Tarefa 15: Desafio Master do Dia — Mini-API Modular com Contador de Requisições

- **Objectivo:** Consolidar todas as competências da Aula 12 num exercício completo.
- **Enunciado:** Cria um pequeno ficheiro autónomo `src/task-mini-api.ts` que arranca na porta 4000 e possui:
  1. Variável global `let requestCount = 0;` que incrementa a cada pedido.
  2. Middleware que imprime no terminal `[INFO]: Método URL - Total de requisições: X`.
  3. CRUD completo de uma entidade à tua escolha (ex.: `Category` com `{ id, name, description }`).
  4. Rota `GET /metrics` que devolve `{ uptimeSeconds: process.uptime(), totalRequests: requestCount }`.
- **Critérios de Avaliação:**
  - [ ] O ficheiro roda sozinho com `npx tsx src/task-mini-api.ts`.
  - [ ] Todas as 4 operações (GET, POST, PUT, DELETE) funcionam com status codes semânticos.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código ou referência ao ficheiro
```
