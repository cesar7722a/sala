# Aula 14: Filtros Avançados, Paginação Defensiva com Query Strings e Tratamento Global de Erros

- **Data:** 2026-11-25 (Quarta-feira)
- **Semana:** Semana 03 — Protocolo HTTP, REST e Express.js
- **Fase:** Fase 2 — APIs e Arquitectura
- **Duração da Sessão:** 90 minutos (15 min revisão das tarefas | 25 min teoria de filtros e erros | 40 min código guiado | 10 min registo)

---

## 1. Tema

Construção de endpoints de consulta avançada com **filtros dinâmicos** e **paginação defensiva** via `req.query`, e implementação da camada definitiva de segurança contra falhas: o **Middleware Global Centralizado de Erros** com 4 parâmetros no Express.

---

## 2. Objectivos de Aprendizagem

- [ ] Dominar a conversão e sanitização de parâmetros de consulta (`req.query`), sabendo que chegam sempre como `string` ou `undefined`.
- [ ] Implementar paginação segura com cálculo de *offset* (`page`, `limit`) e imposição de limite máximo (*maxLimit*) para evitar ataques de negação de serviço (DoS por consumo de memória).
- [ ] Compreender o mecanismo único do Express para tratamento global de erros: o middleware de 4 parâmetros `(err, req, res, next)`.
- [ ] Resolver o **Exercício 3.3** no catálogo de cursos da plataforma da empresa.

---

## 3. Revisão Activa: Auditoria da Pasta `resolucao-tarefas/`

Fizeste uma implementação exemplar das tarefas da Semana 03!
- **`tarefa-aula-12.ts` (Porta 4000):** Servidor independente com rotas `/info`, `/ping`, `/test-created` (201) e `/clear-session` (204).
- **`tarefa-aula-13.ts` (Porta 7000):** Pipeline encadeado de middlewares com logging, injeção de `X-Powered-By-Platform`, bloqueio defensivo de manutenção (status 503), inspecção de `res.on('finish')` e middleware modular `requestTime` enriquecendo o `(req as any).requestTime`.

> [!TIP]
> **Dica de ESM:** No ficheiro `tarefa-aula-13.ts`, adiciona `.js` na importação: `import { requestTime } from "./middlewares/logger.js"`. No ecossistema NodeNext, as extensões `.js` explícitas são a convenção oficial.

---

## 4. Explicação dos Conceitos: Filtros, Paginação e Erros

### 4.1. A Anatomia do `req.query`
Quando um cliente faz uma pesquisa no Frontend:
```
GET /courses?title=node&minPrice=5000&maxPrice=20000&page=1&limit=10
```
- No Node.js, todos os valores de `req.query` são **strings**!
- Exemplo: `req.query.minPrice` chega como `"5000"`, e não como o número `5000`.
- É obrigatório converter para número com `Number(req.query.minPrice)` ou `parseInt()` e validar se não é `NaN`.

### 4.2. Paginação Defensiva: Porque é Obrigatória?
Se a tua plataforma tiver 100.000 aulas e um utilizador chamar `GET /courses`:
- Sem paginação, a base de dados tenta ler 100.000 registos.
- O Node.js tenta criar 100.000 objectos JSON em memória.
- A requisição demora 15 segundos e pode derrubar o servidor.
- **Regra de Ouro:** Impor limites por defeito:
  ```typescript
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10)); // Máximo 50 itens!
  const startIndex = (page - 1) * limit;
  ```

### 4.3. O Middleware de Erro com 4 Parâmetros do Express
O Express tem uma regra interna especial: se uma função tiver **exactamente 4 argumentos**, ele reconhece-a como um interceptador de erros:

```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("💥 Erro capturado centralmente:", err.message);
  res.status(500).json({
    error: "Erro Interno do Servidor",
    message: err.message,
  });
});
```
Se qualquer rota lançar um `throw new Error(...)` ou chamar `next(error)`, o Express ignora todos os outros middlewares e salta **directamente** para este middleware de erro!

---

## 5. Como Criar do Zero (Anatomia e Esqueleto Passo a Passo)

### 5.1. Esqueleto de Rota com Filtros e Paginação

```typescript
app.get("/catalog", (req: Request, res: Response) => {
  // 1. Sanitização e valores padrão
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(20, Math.max(1, Number(req.query.limit) || 5));
  const search = typeof req.query.search === "string" ? req.query.search.toLowerCase() : "";

  // 2. Aplicação de filtros
  let filtered = courses;
  if (search) {
    filtered = filtered.filter((c) => c.title.toLowerCase().includes(search));
  }

  // 3. Paginação defensiva via slice
  const startIndex = (page - 1) * limit;
  const paginatedData = filtered.slice(startIndex, startIndex + limit);

  // 4. Resposta com metadados de paginação
  return res.status(200).json({
    page,
    limit,
    totalRecords: filtered.length,
    totalPages: Math.ceil(filtered.length / limit),
    data: paginatedData,
  });
});
```

---

## 6. Aplicação no Projecto da Empresa (Plataforma de Vídeo-Aulas)

1. **Catálogo de Cursos:** O Frontend em React/Next.js precisa de paginação infinita ou navegação por páginas (`page=1&limit=12`) e busca por texto.
2. **Protecção contra Crash:** O middleware global de erro garante que, se a base de dados PostgreSQL cair temporariamente, o utilizador recebe um JSON amigável `500` com `requestId` em vez de a aplicação Node.js terminar o processo.

---

## 7. Critérios de Conclusão da Aula

- [ ] Exercício 3.3 implementado no `src/server.ts`.
- [ ] Middleware global de tratamento de erros activo.
- [ ] Teste de paginação com query strings comprovado.
- [ ] Painel `progresso.md` actualizado para 22h30 / 108h.
