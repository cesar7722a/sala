# Exercícios — Semana 09: Testes Automatizados (Unitários e de Integração)

---

## Exercício 9.1: Testes Unitários de Regras de Negócio com Mocks (Básico)

### Enunciado
Configura o Vitest (ou Jest) no projecto. Escreve uma suite completa de testes unitários para o `CreateUserService` utilizando um repositório em memória falso (*InMemoryUsersRepository*) ou mocks de funções. Valida os cenários de sucesso e os cenários de falha esperados (ex.: e-mail já em utilização).

### Objectivo
Escrever testes unitários ultra-rápidos e isolados sem dependência de base de dados física nem servidor HTTP ligado.

### Conceitos Envolvidos
- `describe`, `it` / `test`, `expect`.
- Asserções de excepções assíncronas: `await expect(...).rejects.toBeInstanceOf(AppError)`.
- Mocks e repositórios em memória para isolamento.

### Requisitos
1. Configurar `vitest.config.ts`.
2. Criar `src/services/create-user.service.spec.ts`.
3. Cobrir: criação de utilizador com sucesso, encriptação da senha e tentativa de duplicação de e-mail.

### Critérios de Avaliação
- [ ] Execução em milissegundos sem I/O de rede ou disco.
- [ ] 100% de cobertura dos ramos lógicos do Service testado.

### Espaço para Solução e Observações
```typescript
// Cola a tua suite de testes aqui
```
**Observações e Aprendizados:**

---

## Exercício 9.2: Testes de Integração de Endpoints com Supertest (Intermédio)

### Enunciado
Desenvolve testes de integração para o fluxo de autenticação e rotas protegidas utilizando `supertest`. Os testes devem disparar pedidos HTTP reais contra a instância do Express e verificar status codes, formato do corpo de resposta e cabeçalhos retornados.

### Objectivo
Validar a cadeia completa de execução (Middlewares -> Validação Zod -> Controller -> Service -> Resposta HTTP).

### Conceitos Envolvidos
- `supertest(app).post('/sessions').send(...)`.
- Validação de contratos de resposta HTTP.
- Teste de rotas protegidas com passagem de token no cabeçalho `Authorization`.

### Requisitos
1. Separar o ficheiro `app.ts` (configuração do Express) do `server.ts` (onde roda o `app.listen`) para permitir a importação limpa no Supertest sem prender a porta do sistema operacional.
2. Testar rota de registo, rota de login (verificando presença do token) e rota privada `/profile`.
3. Testar envio de payload inválido e validar que retorna status 400.

### Critérios de Avaliação
- [ ] O servidor não precisa de ser iniciado manualmente no terminal para os testes rodarem.
- [ ] Todas as asserções de status e payload passam sem recurso a atrasos artificiais.

### Espaço para Solução e Observações
```typescript
// Cola a tua suite de integração aqui
```
**Observações e Aprendizados:**

---

## Exercício 9.3: Ambiente Isolado de Testes e Limpeza de Base de Dados (Avançado)

### Enunciado
Configura um ambiente de teste automatizado para os testes de integração do Prisma que utiliza um schema de base de dados PostgreSQL isolado (ou base de dados de teste temporária). Implementa hooks `beforeEach` / `afterAll` para limpar tabelas e garantir que nenhum teste sofra efeitos colaterais de testes anteriores.

### Objectivo
Garantir total determinismo e independência nos testes de integração com base de dados real.

### Conceitos Envolvidos
- Scripts de pré-teste e variáveis de ambiente específicas para testes (`.env.test`).
- Hooks de ciclo de vida de testes: `beforeAll`, `beforeEach`, `afterEach`, `afterAll`.
- Truncate de tabelas ou isolamento por schema PostgreSQL.

### Requisitos
1. Configurar script `"test:e2e"` no `package.json`.
2. Executar migrações do Prisma no banco de teste antes de rodar a suite.
3. Garantir limpeza de dados entre testes para que a ordem de execução não altere os resultados.

### Critérios de Avaliação
- [ ] Testes podem ser executados repetidamente sem falhas por duplicidade de registos antigos.
- [ ] A base de dados de desenvolvimento principal nunca é tocada durante a execução dos testes.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**
