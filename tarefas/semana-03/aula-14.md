# Tarefas Diárias — Aula 14: Filtros, Paginação Defensiva e Tratamento de Erros

- **Data da Aula:** 2026-11-25 (Quarta-feira)
- **Módulo:** Semana 03 — Protocolo HTTP, REST e Express.js
- **Objectivo:** Praticar exaustivamente a extracção e cast de `req.query`, filtros dinâmicos com múltiplos critérios, paginação defensiva com limites e captura centralizada de erros.

---

## 🧭 Orientações para a Prática Diária

1. Podes criar um ficheiro na tua pasta: `resolucao-tarefas/semana-03/tarefa-aula-14.ts` para resolver os exercícios e testar!
2. Consulta o **Ponto de Partida / Dica de Construção** em cada exercício.
3. Não te esqueças de converter strings numéricas com `Number()` ou `parseInt()`, verificando valores `NaN`.

---

# 🟢 Nível 1: Query Strings e Cast de Tipos (Exercícios 1 a 5)

---

### Tarefa 01: Leitura Básica de Query String

- **Enunciado:** Cria a rota `GET /echo-query` que lê `req.query.nome` e devolve `{ saudacao: "Olá, " + req.query.nome }`. Se `nome` não for enviado, devolve `"Olá, visitante"`.
- **Dica:** `const nome = typeof req.query.nome === "string" ? req.query.nome : "visitante";`
- **Critérios:**
  - [x] Funciona com `/echo-query?nome=Carlos` e com `/echo-query`.
- **O Teu Código / Solução:**

```typescript
app.get("/echo-query", (req: Request, res: Response) => {
  const name =
    typeof req.query.name === "string" ? req.query.name : "visitante";

  res.status(200).json({ saudacao: "Olá " + name });
});
```

---

### Tarefa 02: Conversão Segura de String para Número

- **Enunciado:** Cria a rota `GET /somar?a=10&b=20`. Lê os valores `a` e `b`, converte para números e devolve `{ resultado: 30 }`. Se algum deles não for um número válido (`isNaN`), devolve `400 Bad Request` com `{ error: "Parâmetros 'a' e 'b' devem ser números válidos!" }`.
- **Critérios:**
  - [x] Valida `isNaN(Number(a))` e rejeita com 400.
  - [x] Retorna a soma correcta com 200.
- **O Teu Código / Solução:**

```typescript
app.get("/somar", (req: Request, res: Response) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res
      .status(400)
      .json({ error: "Parâmetros 'a' e 'b' devem ser números válidos!" });
  }

  const somar = a + b;

  res.status(200).json({ somar });
});
```

---

### Tarefa 03: Filtro por Termo Parcial (`includes`)

- **Enunciado:** Cria uma lista em memória de tags: `["nodejs", "typescript", "backend", "express", "react"]`. Cria a rota `GET /tags?search=type` que retorna apenas as tags que contêm o texto pesquisado (sem diferenciar maiúsculas de minúsculas).
- **Critérios:**
  - [x] Pesquisa insensível a maiúsculas (`.toLowerCase()`).
  - [x] Se `search` for omitido, retorna todas as tags.
- **O Teu Código / Solução:**

```typescript
app.get("/tags", (req: Request, res: Response) => {
  const search = req.query.search;

  if (typeof search !== "string" || search.trim() === "") {
    return res.status(200).json(allTags);
  }

  const tag = allTags.filter((e) =>
    e.toLowerCase().includes(search.toLowerCase()),
  );

  res.status(200).json(tag);
});
```

---

### Tarefa 04: Ordenação por Query Parameter (`sort=asc` ou `desc`)

- **Enunciado:** Cria a rota `GET /precos?sort=asc` que lê uma lista numérica `[15000, 5000, 30000, 10000]`. Se `sort=desc`, ordena do maior para o menor. Se `sort=asc`, do menor para o maior.
- **Critérios:**
  - [x] Responde com a lista ordenada correctamente.
- **O Teu Código / Solução:**

```typescript
const listNumer = [15000, 5000, 30000, 10000];
app.get("/precos", (req: Request, res: Response) => {
  const sort = req.query.sort;

  if (typeof sort !== "string" || sort.trim() === "") {
    return res.status(400).json({
      error: "É necessario o parametro para fazer a ordenação do array número!",
    });
  }

  if (sort === "asc") {
    const ordenarySort = listNumer.sort((a, b) => a - b);
    return res.status(200).json(ordenarySort);
  } else {
    const ordenarySort = listNumer.sort((a, b) => b - a);
    return res.status(200).json(ordenarySort);
  }
});
```

---

### Tarefa 05: Limite de Segurança no Parâmetro `limit`

- **Enunciado:** Cria uma rota que lê `limit` da query. Se o cliente pedir `limit=1000`, a tua API deve forçar o valor máximo a `50`. Se o cliente enviar `limit=-5`, a API deve forçar o valor mínimo a `1`.
- **Dica:** `const safeLimit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));`
- **Critérios:**
  - [x] Limites matemáticos mínimos e máximos impostos.
- **O Teu Código / Solução:**

```typescript
app.get("/couses", (req: Request, res: Response) => {
  const safeLimit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));

  return res.status(200).json({ safeLimit });
});
```

---

# 🟡 Nível 2: Paginação Completa e Múltiplos Filtros (Exercícios 6 a 10)

---

### Tarefa 06: Cálculo Matemático de _Offset_ para Paginação

- **Enunciado:** Cria uma função pura `calculatePagination(page: number, limit: number) => { startIndex: number, endIndex: number }`.
  Para `page = 1, limit = 10` $\rightarrow$ `startIndex = 0, endIndex = 10`.
  Para `page = 2, limit = 10` $\rightarrow$ `startIndex = 10, endIndex = 20`.
- **Critérios:**
  - [x] Fórmula `(page - 1) * limit` aplicada com precisão.
- **O Teu Código / Solução:**

```typescript
function calculatePagination(
  page: number,
  limit: number,
): { startIndex: number; endIndex: number } {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return { startIndex, endIndex };
}
```

---

### Tarefa 07: Rota com Metadados de Paginação

- **Enunciado:** Dada uma lista de 25 cursos fictícios, cria a rota `GET /cursos-paginados?page=2&limit=5`. A resposta deve conter o cabeçalho de metadados:
  ```json
  {
    "page": 2,
    "limit": 5,
    "totalItems": 25,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": true,
    "data": [...]
  }
  ```
- **Critérios:**
  - [x] Retorna exactamente 5 itens.
  - [x] Calcula `totalPages` com `Math.ceil(total / limit)`.
- **O Teu Código / Solução:**

```typescript
app.get("/cursos-paginados", (req: Request, res: Response) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  if (Number.isNaN(page) || Number.isNaN(limit)) {
    return res
      .status(400)
      .json({ error: "os dados da page e limit precisam ser um numero!!" });
  }

  const { startIndex, endIndex } = calculatePagination(page, limit);
  const data = coursesAll.slice(startIndex, endIndex);

  const totalItems = coursesAll.length;
  const totalPages = Math.ceil(totalItems / limit);

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  res.status(200).json({
    metadados: {
      page: page,
      limit: limit,
      totalItems: totalItems,
      hasNextPage: hasNextPage,
      hasPrevPage: hasPrevPage,
    },
    data: data,
  });
});
```

---

### Tarefa 08: Filtro Composto (Categoria + Preço Máximo)

- **Enunciado:** Na lista de cursos, permite filtrar em simultâneo por `categoria` E por `maxPrice`:
  `GET /cursos?categoria=backend&maxPrice=20000`.
- **Critérios:**
  - [x] Ambos os filtros são aplicados de forma cumulativa.
- **O Teu Código / Solução:**

```typescript
app.get("/cursos", (req: Request, res: Response) => {
  const categoria = req.query.categoria;
  const maxPrice = Number(req.query.maxPrice);

  if (
    typeof categoria !== "string" ||
    categoria.trim() === "" ||
    Number.isNaN(maxPrice)
  ) {
    return res
      .status(400)
      .json({ error: "Os dados deve ser enviado na url!!" });
  }

  const data = coursesAll.filter((e) => {
    return (
      e.category.toLowerCase().includes(categoria.toLowerCase()) &&
      e.price >= maxPrice
    );
  });

  res.status(200).json(data);
});
```

---

### Tarefa 09: Simulação de Erro com `throw` Dentro de uma Rota

- **Enunciado:** Cria a rota `GET /forcar-erro`. Dentro dela, executa `throw new Error("Falha intencional de simulação!");`.
- **Critérios:**
  - [x] Observa como o Express lida com o erro (por padrão ele imprime a stack trace em HTML ou JSON).
- **O Teu Código / Solução:**

```typescript
app.get("/forcar-erro", () => {
  throw new Error("Falha intencional de simulação!");
});
```

---

### Tarefa 10: O Middleware Global de Erro com 4 Parâmetros

- **Enunciado:** Adiciona no teu servidor o middleware `(err: any, req: Request, res: Response, next: NextFunction)`. Ele deve capturar o erro lançado na Tarefa 09 e responder com `500 Internal Server Error` e JSON:
  `{ error: "Erro interno", mensagem: err.message, timestamp: new Date().toISOString() }`.
- **Critérios:**
  - [ ] Tem de ter exactamente 4 argumentos para ser reconhecido pelo Express.
  - [ ] Deve estar posicionado **depois** de todas as rotas.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```

---

# 🔴 Nível 3: Robustez Corporativa na Plataforma de Cursos (Exercícios 11 a 15)

---

### Tarefa 11: Classe de Erro de Negócio Customizada (`AppError`)

- **Enunciado:** Cria uma classe `class AppError extends Error` que recebe `message: string` e `statusCode: number` (ex.: 400, 404, 409).
- **Dica:**
  ```typescript
  export class AppError extends Error {
    constructor(
      public message: string,
      public statusCode = 400,
    ) {
      super(message);
    }
  }
  ```
- **Critérios:**
  - [ ] Permite fazer `throw new AppError("Curso não encontrado", 404);`.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```

---

### Tarefa 12: Middleware de Erro Inteligente com Diferenciação de Status

- **Enunciado:** Modifica o middleware global de erros para verificar:
  - Se `err instanceof AppError` $\rightarrow$ responde com `err.statusCode` e `{ error: err.message }`.
  - Se for outro erro $\rightarrow$ responde com status `500` e mensagem genérica para não vazar detalhes sensíveis do sistema ao cliente.
- **Critérios:**
  - [ ] Erros conhecidos respondem com o status correto (400, 404).
  - [ ] Erros inesperados respondem com 500 seguro.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```

---

### Tarefa 13: Busca com Múltiplas Palavras (Full-Text Search Simples)

- **Enunciado:** Cria a rota `GET /search?q=node+backend`. Separa a query por espaços (`q.split(" ")`) e procura cursos cujo título contenha **todas** as palavras pesquisadas.
- **Critérios:**
  - [ ] Utiliza `words.every(w => title.includes(w))`.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```

---

### Tarefa 14: Rota de Cursos Disponíveis para Compra com Filtro de Aluno

- **Enunciado:** Cria a rota `GET /available-courses?studentId=101`. Deve listar apenas os cursos nos quais o aluno com ID 101 **ainda não está matriculado**.
- **Critérios:**
  - [ ] Cruza a lista de matrículas com a lista de cursos.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```

---

### Tarefa 15: Desafio Master — Resolução do Exercício 3.3

- **Enunciado:** Na rota `GET /courses` do teu servidor principal, combina:
  1. Filtros por `title` (pesquisa parcial), `minPrice` e `maxPrice`.
  2. Paginação com `page` e `limit` com cálculo de páginas.
  3. Tratamento de erros caso `minPrice > maxPrice` com `AppError("Preço mínimo não pode ser superior ao máximo", 400)`.
- **Critérios:**
  - [ ] Todas as combinações de busca e paginação respondem com precisão.
  - [ ] Erro 400 disparado e tratado centralmente pelo middleware global.
- **O Teu Código / Solução:**

```typescript
// Cola aqui o teu código
```
