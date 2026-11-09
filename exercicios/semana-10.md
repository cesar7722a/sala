# Exercícios — Semana 10: Performance, Caching com Redis e Filas de Tarefas (BullMQ)

---

## Exercício 10.1: Estratégia de Caching Cache-Aside com Redis (Básico)

### Enunciado
Implementa o padrão *Cache-Aside* no endpoint de listagem de categorias de produtos (`GET /categories`). Na primeira requisição, a aplicação consulta o PostgreSQL via Prisma, armazena o resultado no Redis com um TTL (Time-To-Live) de 60 segundos e retorna os dados. Nas requisições seguintes dentro desse intervalo, os dados devem ser retornados directamente do Redis.

### Objectivo
Reduzir a latência de endpoints de consulta frequente e poupar recursos da base de dados relacional.

### Conceitos Envolvidos
- Padrão Cache-Aside (Leitura: Cache -> Miss -> DB -> Grava Cache -> Retorna).
- Cliente `ioredis`.
- Serialização/deserialização JSON (`JSON.stringify` / `JSON.parse`).
- Expiração com TTL (`SETEX` ou `set(key, value, 'EX', seconds)`).

### Requisitos
1. Subir instância local do Redis (ou via Docker).
2. Criar serviço utilitário de cache `RedisCacheService`.
3. Inserir indicador no log ou no cabeçalho `X-Cache: HIT` ou `X-Cache: MISS`.

### Critérios de Avaliação
- [ ] Primeira requisição: `X-Cache: MISS` (tempo maior); segunda requisição: `X-Cache: HIT` (tempo drasticamente inferior).
- [ ] Chave expira automaticamente após o período estipulado.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**

---

## Exercício 10.2: Invalidação Determinística de Cache (Intermédio)

### Enunciado
Expande o sistema de cache de modo que, sempre que uma nova categoria for criada, editada ou eliminada, a chave de cache correspondente no Redis seja imediatamente invalidada (`DEL categories:all`).

### Objectivo
Evitar inconsistências de dados (*Stale Data*) garantindo coerência entre as operações de escrita na base de dados e os dados cacheados.

### Conceitos Envolvidos
- Invalidação orientada a eventos ou por operações de mutação.
- Padrão de chaves com prefixo e namespaces (ex.: `cache:categories:*`).

### Requisitos
1. Chamar a invalidação dentro do Service responsável pelas acções de criação/actualização.
2. Comprovar que, imediatamente após cadastrar uma categoria nova, a próxima requisição de listagem faz leitura directa na base de dados actualizada.

### Critérios de Avaliação
- [ ] Nenhuma categoria antiga é retornada após a execução de uma operação de escrita.
- [ ] Erros pontuais de ligação ao Redis não travam a escrita na base de dados (degradação graciosa).

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**

---

## Exercício 10.3: Fila de Tarefas Assíncronas com BullMQ e Workers (Avançado)

### Enunciado
Desenvolve um fluxo assíncrono para envio de e-mails de boas-vindas após o registo de utilizadores. O endpoint de registo deve apenas salvar o utilizador, publicar um job na fila `welcome-email-queue` e responder imediatamente com status 201 Created ao cliente. Um worker separado deve consumir a fila, simular o envio com atraso de 2 segundos e tratar até 3 tentativas automáticas em caso de falha.

### Objectivo
Desacoplar tarefas pesadas ou dependentes de APIs externas do tempo de resposta HTTP do utilizador final.

### Conceitos Envolvidos
- Fila BullMQ (`Queue`, `Worker`, `QueueEvents`).
- Job data e opções de retry com `backoff: { type: 'exponential', delay: 1000 }`.
- Monitorização de eventos (`completed`, `failed`).

### Requisitos
1. Criar `mailQueue` com BullMQ conectada ao Redis.
2. Criar `mailWorker` executado como processo dedicado ou worker em background.
3. Configurar 3 retries com backoff exponencial.

### Critérios de Avaliação
- [ ] Resposta HTTP da API é instantânea (< 50ms) independentemente do tempo de envio do e-mail.
- [ ] Em caso de falha simulada, o worker reexecuta a tarefa respeitando o tempo de espera.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**
