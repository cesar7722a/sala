# Tarefas Diárias — Aula 13: Middlewares, Auditoria e Performance no Express

- **Data da Aula:** 2026-11-24 (Terça-feira)
- **Módulo:** Semana 03 — Protocolo HTTP, REST e Express.js
- **Objectivo:** Praticar exaustivamente a criação de middlewares globais e por rota, interceptação de fluxo, cabeçalhos HTTP, medição de performance e bloqueio de requisições.

---

## 🧭 Orientações para a Prática Diária

1. Podes testar cada middleware directamente no teu servidor Express (`src/server.ts`) ou num ficheiro dedicado de tarefas.
2. Lembra-te da regra de ouro: **um middleware tem sempre de chamar `next()` ou responder com `res.status().json()`**. Se esqueceres do `next()`, a requisição congela!
3. Consulta o **Ponto de Partida / Dica de Construção** em cada exercício para arrancares com confiança.

---

# 🟢 Nível 1: Fundamentos de Middlewares e Sintaxe (Exercícios 1 a 5)

---

### Tarefa 01: O Middleware "Hello World" de Terminal
- **Objectivo:** Compreender a assinatura `(req, res, next)` e a invocação de `next()`.
- **Enunciado:** Cria um middleware global simples que imprime na consola `"👉 Pedido recebido!"` a cada requisição e chama `next()`.
- **Dica de Arranque:**
  ```typescript
  app.use((_req, _res, next) => {
    console.log("👉 Pedido recebido!");
    next();
  });
  ```
- **Critérios de Avaliação:**
  - [ ] A mensagem surge no terminal a cada chamada.
  - [ ] As rotas continuam a responder normalmente (não travam).
- **O Teu Código / Solução:**
```typescript
// Cola aqui o teu código
```

---

### Tarefa 02: Middleware de Inspecção de Método e URL
- **Objectivo:** Aceder às propriedades do objecto `req`.
- **Enunciado:** Cria um middleware que regista o método e a URL original de cada pedido no formato: `[LOGGER]: GET /courses`.
- **Critérios de Avaliação:**
  - [ ] Usa `req.method` e `req.originalUrl`.
  - [ ] Imprime correctamente para qualquer rota acessada.
- **O Teu Código / Solução:**
```typescript
// Cola aqui o teu código
```

---

### Tarefa 03: Injector de Cabeçalho Global na Resposta
- **Objectivo:** Adicionar cabeçalhos de resposta com `res.setHeader()`.
- **Enunciado:** Cria um middleware que adiciona o cabeçalho `X-Powered-By-Platform: VideoPlatform-Engine` em todas as respostas enviadas pela API.
- **Dica de Arranque:**
  ```typescript
  app.use((_req, res, next) => {
    res.setHeader("X-Powered-By-Platform", "VideoPlatform-Engine");
    next();
  });
  ```
- **Critérios de Avaliação:**
  - [ ] O cabeçalho aparece nas respostas do Postman/curl/navegador.
- **O Teu Código / Solução:**
```typescript
// Cola aqui o teu código
```

---

### Tarefa 04: Middleware de Bloqueio por Manutenção (Feature Toggle)
- **Objectivo:** Aprender a abortar uma requisição dentro de um middleware antes de chegar ao controller.
- **Enunciado:** Cria um middleware com uma variável `const isMaintenanceMode = false;`. Se for `true`, o middleware responde imediatamente com status `503 Service Unavailable` e JSON `{ error: "Sistema temporariamente em manutenção!" }`, sem chamar `next()`.
- **Critérios de Avaliação:**
  - [ ] Quando `true`, nenhuma rota responde e o status 503 é emitido.
  - [ ] Quando `false`, a aplicação funciona sem qualquer impedimento.
- **O Teu Código / Solução:**
```typescript
// Cola aqui o teu código
```

---

### Tarefa 05: Inspecção do Evento `res.on('finish')`
- **Objectivo:** Entender quando a resposta foi completamente transmitida pela rede.
- **Enunciado:** Cria um middleware que regista `res.on('finish', () => console.log("Resposta enviada com status:", res.statusCode))`.
- **Critérios de Avaliação:**
  - [ ] O log só é disparado depois de a rota enviar a resposta.
  - [ ] O status impresso coincide com o status real retornado pela rota.
- **O Teu Código / Solução:**
```typescript
// Cola aqui o teu código
```

---

# 🟡 Nível 2: Modificação de Contexto e Middlewares Específicos (Exercícios 6 a 10)

---

### Tarefa 06: Injeção de Propriedades Customizadas no Objecto `req`
- **Objectivo:** Passar dados de um middleware para o controller através do `req`.
- **Enunciado:** Cria um middleware que calcula `(req as any).requestTime = new Date();`. Na rota `GET /ping`, lê essa propriedade e devolve-a no JSON da resposta.
- **Critérios de Avaliação:**
  - [ ] Propriedade acessada com sucesso dentro da rota.
- **O Teu Código / Solução:**
```typescript
// Cola aqui o teu código
```

---

### Tarefa 07: Gerador de Identificador Único de Requisição (`X-Request-Id`)
- **Objectivo:** Rastreabilidade corporativa de requisições.
- **Enunciado:** Cria um middleware que gera um ID único para cada pedido (podes usar `Date.now() + "-" + Math.random().toString(36).substring(2, 7)` ou `node:crypto.randomUUID()`), injecta no cabeçalho de resposta `X-Request-Id` e guarda em `(req as any).requestId`.
- **Critérios de Avaliação:**
  - [ ] Cada requisição recebe um ID diferente.
  - [ ] O cabeçalho `X-Request-Id` está presente na resposta.
- **O Teu Código / Solução:**
```typescript
// Cola aqui o teu código
```

---

### Tarefa 08: Middleware Específico de Rota (Guard de Autenticação com API Key)
- **Objectivo:** Aplicar middleware apenas numa rota específica, e não globalmente.
- **Enunciado:** Cria a função middleware `apiKeyGuard(req, res, next)`. Ela verifica se o cabeçalho `x-api-key === "segredo-da-empresa"`. Se não for, responde com `401 Unauthorized`. Aplica este middleware **apenas** na rota `DELETE /courses/:id`.
- **Dica de Arranque:**
  ```typescript
  app.delete("/courses/:id", apiKeyGuard, (req, res) => { /* ... */ });
  ```
- **Critérios de Avaliação:**
  - [ ] As rotas GET continuam públicas sem exigir chave.
  - [ ] A rota DELETE é bloqueada sem a chave correcta.
- **O Teu Código / Solução:**
```typescript
// Cola aqui o teu código
```

---

### Tarefa 09: Validador de Content-Type Obrigatório para POST/PUT
- **Objectivo:** Impedir que clientes enviem formatos não suportados.
- **Enunciado:** Cria um middleware que, caso o método seja `POST` ou `PUT`, verifica se o cabeçalho `content-type` contém `application/json`. Se o cliente esquecer do cabeçalho ou enviar texto puro, retorna `415 Unsupported Media Type` com `{ error: "O corpo deve ser enviado como application/json" }`.
- **Critérios de Avaliação:**
  - [ ] Rejeita requisições sem `Content-Type: application/json` nos métodos de escrita.
  - [ ] Permite requisições GET normais sem interferência.
- **O Teu Código / Solução:**
```typescript
// Cola aqui o teu código
```

---

### Tarefa 10: Medidor de Tempo de Alta Resolução com `process.hrtime.bigint()`
- **Objectivo:** Medição precisa em nanossegundos/milissegundos.
- **Enunciado:** Implementa o middleware de medição usando `process.hrtime.bigint()`. No evento `res.on('finish')`, calcula a diferença: `Number(end - start) / 1_000_000` e imprime o resultado formatado com 2 casas decimais: `Tempo de resposta: 1.45ms`.
- **Critérios de Avaliação:**
  - [ ] Medição com precisão de frações de milissegundo.
- **O Teu Código / Solução:**
```typescript
// Cola aqui o teu código
```

---

# 🔴 Nível 3: Segurança e Casos Reais da Plataforma de Cursos (Exercícios 11 a 15)

---

### Tarefa 11: Sanitizador de Payload (Remoção de Espaços em Branco)
- **Objectivo:** Limpar entradas de dados antes de chegarem aos controllers.
- **Enunciado:** Cria um middleware que intercepta o `req.body`. Se existirem campos de texto (strings) com espaços nas pontas (ex.: `"  Node.js Backend  "`), aplica `.trim()` automaticamente em todos os campos do objecto antes de passar para o `next()`.
- **Critérios de Avaliação:**
  - [ ] Os dados chegam ao controller já limpos e sem espaços desnecessários.
- **O Teu Código / Solução:**
```typescript
// Cola aqui o teu código
```

---

### Tarefa 12: Rate Limiting em Memória Básico por IP
- **Objectivo:** Proteger a API contra sobrecarga de chamadas repetidas.
- **Enunciado:** Cria um objecto em memória `const requestCounts: Record<string, number> = {};`. O middleware obtém o IP do cliente através de `req.ip || "127.0.0.1"`. Se o mesmo IP fizer mais de 10 chamadas num intervalo de 1 minuto, retorna `429 Too Many Requests` com `{ error: "Muitos pedidos enviados. Aguarda um momento." }`.
- **Critérios de Avaliação:**
  - [ ] Retorna status 429 após ultrapassar o limite.
- **O Teu Código / Solução:**
```typescript
// Cola aqui o teu código
```

---

### Tarefa 13: Simulador de Latência de Rede (Chaos Engineering)
- **Objectivo:** Testar como o Frontend se comporta com conexões lentas.
- **Enunciado:** Cria um middleware activável via query parameter `?delay=1000`. Se o parâmetro estiver presente, usa `setTimeout(next, Number(req.query.delay))` para atrasar a execução da rota pelo tempo especificado.
- **Critérios de Avaliação:**
  - [ ] A rota só responde após o tempo de delay solicitado.
- **O Teu Código / Solução:**
```typescript
// Cola aqui o teu código
```

---

### Tarefa 14: Middleware de Tratamento Global de Erros (`err, req, res, next`)
- **Objectivo:** Capturar excepções lançadas em qualquer ponto da aplicação.
- **Enunciado:** O Express identifica um middleware de erro especial quando ele recebe 4 parâmetros: `(err: any, req: Request, res: Response, next: NextFunction)`. Adiciona este middleware no final da aplicação para responder com status `500 Internal Server Error` e `{ error: "Ocorreu um erro interno no servidor", details: err.message }`.
- **Dica de Arranque:**
  ```typescript
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("❌ Erro capturado:", err.message);
    res.status(500).json({ error: "Erro interno", details: err.message });
  });
  ```
- **Critérios de Avaliação:**
  - [ ] Rotas que dão `throw new Error("Falha no banco")` são capturadas por este middleware sem fechar o processo do Node.js.
- **O Teu Código / Solução:**
```typescript
// Cola aqui o teu código
```

---

### Tarefa 15: Desafio Master — O Middleware Completo de Auditoria Corporativa (`X-Response-Time`)
- **Objectivo:** Resolver na íntegra o **Exercício 3.2** do roadmap da Semana 03.
- **Enunciado:** Constrói um middleware que:
  1. Gera e injecta `X-Request-Id`.
  2. Calcula a duração precisa e injecta o cabeçalho `X-Response-Time: XXms` no cliente.
  3. No evento `finish`, imprime uma linha de log formatada com cores ou emojis:
     `⚡ [GET] /courses/1 -> Status 200 (Tempo: 4.12ms | RequestID: req_123)`.
- **Critérios de Avaliação:**
  - [ ] Cabeçalhos presentes nas respostas inspecionadas.
  - [ ] Log limpo e legível na consola.
- **O Teu Código / Solução:**
```typescript
// Cola aqui o teu código
```
