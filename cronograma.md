# Cronograma Detalhado da Formação (12 Semanas)

Este documento estabelece o planeamento minucioso das 12 semanas de formação, articulado em 6 fases de desenvolvimento técnico progressivo.

---

## FASE 1: FUNDAMENTOS DE NODE.JS (Semanas 1 e 2)

### Semana 1: Node.js e Ambiente de Desenvolvimento
- **Objectivos:** Compreender o modelo de execução em servidor, a arquitectura do Node.js (V8 + libuv), sistema de módulos, variáveis de ambiente e ferramentas de depuração.
- **Conteúdos:**
  - O que é o Node.js e diferença face ao motor JavaScript no Browser.
  - V8 Engine, libuv e introdução ao Event Loop.
  - Gestão de pacotes com NPM, ficheiro `package.json`, scripts e dependências (`dependencies` vs `devDependencies`).
  - CommonJS (`require`/`module.exports`) vs ES Modules (`import`/`export`).
  - Variáveis de ambiente (`process.env`, `.env`).
  - Módulos nativos essenciais: `process`, `fs/promises`, `path`, `os`.
  - Configuração de TypeScript (`tsconfig.json`, `tsx`, `ts-node`).
  - Depuração (Debugging) integrada no VS Code.
- **Actividades e Exercícios:**
  - Configurar um ambiente Node.js limpo com TypeScript e depuração activa.
  - Criar scripts utilitários de linha de comando para manipular ficheiros e variáveis de ambiente.
- **Aplicação Prática no Projecto:**
  - Analisar o `package.json`, `tsconfig.json` e os scripts de arranque da aplicação da empresa.
- **Entregável:** Estrutura base de desenvolvimento configurada com scripts de compilação, execução e depuração a funcionar.
- **Critérios de Conclusão:** Explicar com clareza o papel do V8 e da libuv, saber transitar entre CJS e ESM, e depurar scripts usando breakpoints no VS Code.

---

### Semana 2: JavaScript Assíncrono e Event Loop na Prática
- **Objectivos:** Dominar a natureza não-bloqueante do Node.js, fluxo de microtarefas/macrotarefas, tratamento rigoroso de erros assíncronos e processamento eficiente com Streams e Buffers.
- **Conteúdos:**
  - Ciclo de vida do Event Loop: Timers, Pending callbacks, Poll, Check (`setImmediate`), Close callbacks, `process.nextTick`.
  - Callbacks, Promises e sintaxe moderna `async`/`await`.
  - Orquestração de tarefas paralelas: `Promise.all`, `Promise.allSettled`, `Promise.race`, `Promise.any`.
  - Manipulação de dados binários: `Buffer` e representações de memória.
  - Processamento orientado a fluxo: `Readable`, `Writable`, `Transform` Streams e `pipeline`.
  - Gestão de excepções assíncronas: tratamento centralizado, `unhandledRejection` e `uncaughtException`.
- **Actividades e Exercícios:**
  - Implementar um script assíncrono para processar ficheiros volumosos via Streams sem elevar o consumo de RAM.
  - Simular cenários de falhas de rede em lote utilizando `Promise.allSettled`.
- **Aplicação Prática no Projecto:**
  - Identificar métodos que realizam operações I/O pesadas no projecto da empresa e verificar se existem bloqueios ou tratamento inadequado de Promises.
- **Entregável:** Serviço assíncrono funcional de leitura e transformação de ficheiros com consumo controlado de memória.
- **Critérios de Conclusão:** Saber justificar quando usar Streams vs buffers em memória e garantir que nenhuma Promise rejeitada fica sem captura (`unhandledRejection`).

---

## FASE 2: APIS E ARQUITECTURA (Semanas 3 e 4)

### Semana 3: Protocolo HTTP, REST e Express.js
- **Objectivos:** Compreender o ciclo de vida de requisições HTTP, princípios arquitecturais REST e construção de endpoints estruturados com Express.js e TypeScript.
- **Conteúdos:**
  - Protocolo HTTP: Métodos (GET, POST, PUT, PATCH, DELETE), Status Codes (2xx, 3xx, 4xx, 5xx), Headers e Payload.
  - Princípios do estilo arquitectural REST (stateless, recursos, URIs previsíveis).
  - Framework Express.js: Router, Controllers e Middlewares.
  - Middlewares em profundidade: ciclo `req`, `res`, `next()`, middlewares de aplicação, rota e tratamento de erros.
  - Captura de parâmetros: `req.params`, `req.query`, `req.body`, `req.headers`.
- **Actividades e Exercícios:**
  - Construir uma API REST para gestão de tarefas com suporte a paginação simples e filtros por query string.
  - Criar um middleware customizado de logging e cálculo de tempo de resposta.
- **Aplicação Prática no Projecto:**
  - Mapear as rotas e a cadeia de middlewares presentes na API da empresa.
- **Entregável:** API REST CRUD funcional, tipada com TypeScript, com tratamento inicial de erros.
- **Critérios de Conclusão:** Respeitar a semântica dos verbos e códigos de estado HTTP e dominar a intercepção de pedidos via middlewares.

---

### Semana 4: Arquitectura Backend, Padrões e SOLID
- **Objectivos:** Estruturar aplicações profissionais desacopladas através do padrão Controller-Service-Repository, Inversão de Dependências e tratamento global de excepções.
- **Conteúdos:**
  - Separação de responsabilidades e camadas lógicas (Controllers, Services, Repositories/Data Access, DTOs).
  - Fundamentos de Clean Architecture e Hexagonal Architecture aplicados a Node.js.
  - Princípios SOLID com destaque para SRP (Single Responsibility) e DIP (Dependency Inversion).
  - Criação de classes de erro de domínio customizadas (`AppError`, `NotFoundError`, `ConflictError`).
  - Middleware global de tratamento de erros com formatação uniforme de respostas.
  - Gestão centralizada de configurações e variáveis de ambiente tipadas.
- **Actividades e Exercícios:**
  - Refactorizar a API da Semana 3 separando estritamente regras de transporte HTTP (Controllers), regras de negócio (Services) e armazenamento (Repositories em memória).
- **Aplicação Prática no Projecto:**
  - Mapear a árvore de pastas e a hierarquia de camadas da aplicação da empresa.
- **Entregável:** API refactorizada com arquitectura em 3 camadas, livre de regras de negócio acopladas aos controladores.
- **Critérios de Conclusão:** Isolar a lógica de negócio de modo que a substituição da framework HTTP ou da base de dados não exija alterações nos Services.

---

## FASE 3: BASES DE DADOS E VALIDAÇÃO (Semanas 5 e 6)

### Semana 5: Bases de Dados Relacionais e ORM (PostgreSQL & Prisma)
- **Objectivos:** Dominar a modelação de dados relacional, migrações determinísticas, operações CRUD avançadas, relacionamentos e transacções atómicas com Prisma ORM e PostgreSQL.
- **Conteúdos:**
  - Modelação de dados relacional: Chaves primárias (UUID vs Autoincrement), Chaves estrangeiras, Índices e Integridade referencial.
  - Configuração do PostgreSQL local e via Docker.
  - Prisma Schema: Modelos, atributos (`@id`, `@default`, `@relation`, `@unique`), tipos escalares e Enums.
  - Prisma CLI: `prisma migrate dev`, `prisma db push`, `prisma studio`, `prisma generate`.
  - Operações com Prisma Client: `findMany`, `findUnique`, `create`, `update`, `delete`, filtros avançados e inclusão de relações (`include`, `select`).
  - Transacções com `$transaction` (interactivas e sequenciais) para garantir atomicidade.
- **Actividades e Exercícios:**
  - Projectar o esquema relacional de utilizadores, produtos e pedidos.
  - Implementar um fluxo de criação de pedido que utiliza transacções atómicas para validar e decrementar stock.
- **Aplicação Prática no Projecto:**
  - Analisar os esquemas de dados da empresa, migrações existentes e como as transacções críticas são geridas.
- **Entregável:** API com persistência de dados real em PostgreSQL através de migrações e repositórios tipados.
- **Critérios de Conclusão:** Executar migrações com segurança, consultar dados relacionados evitando o problema N+1 e assegurar a consistência transaccional.

---

### Semana 6: Validação de Dados e Tratamento Consistente de Erros
- **Objectivos:** Blindar as fronteiras da aplicação com validação estrita de esquemas em runtime utilizando Zod, transformações de dados e respostas de erro uniformes.
- **Conteúdos:**
  - Importância da validação no Backend: nunca confiar nos dados enviados pelo cliente.
  - Biblioteca Zod: Schemas primitivos, objectos, arrays, enums, refinamentos (`refine`, `transform`).
  - Validação de entrada: `body`, `query` e `params` via middleware reutilizável.
  - Inferência automática de tipos TypeScript a partir de schemas Zod (`z.infer<typeof schema>`).
  - Padronização do contrato de erro da API (código do erro, mensagem amigável, mapa de campos inválidos).
  - Implementação de paginação defensiva (`limit`, `page`), ordenação segura e pesquisa parcial.
- **Actividades e Exercícios:**
  - Criar um middleware genérico de validação com Zod capaz de interceptar simultaneamente body, query e params.
  - Adicionar validação estrita a todos os endpoints existentes com mensagens de validação claras.
- **Aplicação Prática no Projecto:**
  - Avaliar a biblioteca de validação utilizada no projecto da empresa e implementar melhorias de validação em endpoints críticos.
- **Entregável:** API completamente protegida contra dados malformados, retornando códigos 400 Bad Request detalhados e estruturados.
- **Critérios de Conclusão:** Nenhuma rota exposta sem validação de tipos de dados em runtime e inferência estrita em tempo de compilação.

---

## FASE 4: AUTENTICAÇÃO E SEGURANÇA (Semanas 7 e 8)

### Semana 7: Autenticação Segura e Gestão de Sessões (JWT)
- **Objectivos:** Compreender o fluxo de autenticação stateless baseado em tokens, hashing criptográfico de palavras-passe, access tokens, refresh tokens e protecção de rotas.
- **Conteúdos:**
  - Distinção fundamental entre Autenticação (quem é) e Autorização (o que pode fazer).
  - Armazenamento seguro de passwords: Salt, Hashing, algoritmos modernos (Argon2id ou bcrypt).
  - JSON Web Tokens (JWT): Anatomia (Header, Payload, Signature), expiração e chaves secretas.
  - Estratégia de Access Token (curta duração) + Refresh Token (longa duração com rotação).
  - Middleware de autenticação: Extracção do Header `Authorization: Bearer <token>`, verificação e enriquecimento de `req.user`.
  - Invalidação de sessões e boas práticas no armazenamento de tokens no cliente (HTTP-only cookies vs LocalStorage).
- **Actividades e Exercícios:**
  - Implementar os endpoints de `/register`, `/login` e `/refresh-token` com validação de credenciais e geração de tokens assinados.
  - Criar um middleware `ensureAuthenticated` para proteger recursos privados.
- **Aplicação Prática no Projecto:**
  - Analisar o fluxo de login da empresa, validação de tokens nos cabeçalhos e tratamento de expiração.
- **Entregável:** Sistema completo de registo e login com palavras-passe encriptadas e protecção de rotas autenticadas.
- **Critérios de Conclusão:** Senhas nunca salvas em texto limpo, verificação matemática de tokens e rota protegida retornando 401 Unauthorized para acessos inválidos.

---

### Semana 8: Autorização (RBAC) e Segurança Defensiva de APIs
- **Objectivos:** Implementar controlo de acesso baseado em papéis (RBAC), mitigar as principais vulnerabilidades descritas no OWASP API Security Top 10 e configurar cabeçalhos de segurança.
- **Conteúdos:**
  - Modelos de Controlo de Acesso: RBAC (Role-Based Access Control) e introdução a ABAC/PBAC.
  - Middlewares de autorização para verificação de papéis (ex.: `admin`, `manager`, `user`).
  - Segurança de rede e transporte: CORS (Cross-Origin Resource Sharing) configurado com origens restritas.
  - Defesa contra ataques comuns: Rate Limiting (`express-rate-limit`), protecção contra Brute Force e DoS.
  - Headers HTTP de protecção com Helmet (X-Content-Type-Options, HSTS, CSP).
  - Prevenção de SQL Injection (mitigado por consultas parametrizadas do ORM), NoSQL Injection e Mass Assignment.
  - Sanitização de dados de entrada e protecção de segredos em variáveis de ambiente.
- **Actividades e Exercícios:**
  - Implementar middleware flexível para autorização de múltiplos papéis (`hasRole(['ADMIN', 'MANAGER'])`).
  - Configurar e testar Rate Limiting num endpoint sensível (ex.: rota de login).
- **Aplicação Prática no Projecto:**
  - Verificar as regras de CORS, Rate Limiting e protecções de cabeçalhos no projecto da empresa.
- **Entregável:** API segura com controlo granular de permissões e protecções defensivas activas contra abusos.
- **Critérios de Conclusão:** Tentativas de acesso a rotas restritas bloqueadas com 403 Forbidden e protecções activas contra abusos de requisições excessivas.

---

## FASE 5: QUALIDADE E PERFORMANCE (Semanas 9 e 10)

### Semana 9: Testes Automatizados (Unitários e de Integração)
- **Objectivos:** Dominar a pirâmide de testes no Backend, escrevendo testes unitários isolados com mocks e testes de integração de ponta a ponta com base de dados de teste.
- **Conteúdos:**
  - Porquê testar: Fiabilidade, prevenção de regressões e facilidade de refactorização.
  - Ferramental moderno: Vitest ou Jest com TypeScript.
  - Testes Unitários: Testar regras de negócio em Services utilizando Mocks e Stubs para a camada de persistência.
  - Testes de Integração de API com Supertest: Fazer pedidos HTTP contra a aplicação Express e validar resposta, status e headers.
  - Estratégias para bases de dados em testes de integração (ambiente isolado, limpeza pré/pós teste).
  - Métricas de cobertura de código (Coverage Reports) e o que realmente importa testar.
- **Actividades e Exercícios:**
  - Escrever cobertura de testes unitários para os Services de autenticação e regras de negócio.
  - Escrever testes de integração para o fluxo completo de criação e listagem de recursos.
- **Aplicação Prática no Projecto:**
  - Analisar a suite de testes existente na empresa (ou identificar o primeiro endpoint prioritário para receber testes).
- **Entregável:** Suite automatizada de testes executável via comando `npm test`, cobrindo os caminhos felizes e de erro da API.
- **Critérios de Conclusão:** Testes rápidos, determinísticos e independentes entre si, sem efeito colateral na base de dados de desenvolvimento.

---

### Semana 10: Performance, Caching com Redis e Filas de Tarefas (BullMQ)
- **Objectivos:** Identificar e mitigar estrangulamentos de performance, implementar estratégias de caching distribuído com Redis e desacoplar processos pesados através de background jobs.
- **Conteúdos:**
  - Diagnóstico de performance: Tempo de resposta, N+1 queries, profiling básico de requisições.
  - Caching no Backend: Estratégias Cache-Aside, invalidação de cache e TTL (Time-To-Live).
  - Introdução ao Redis: Estruturas de dados, ligação e operações de leitura/escrita.
  - Processamento Assíncrono fora do ciclo HTTP: Envio de e-mails, relatórios, processamento de imagens.
  - Arquitectura orientada a filas: Message Queues, Producers, Consumers e Workers com BullMQ.
  - Estratégia de tentativas (retries), Dead Letter Queues e tolerância a falhas.
  - Registo estruturado de logs com Pino ou Winston.
- **Actividades e Exercícios:**
  - Implementar cache com Redis numa rota de leitura frequente com invalidação automática na escrita.
  - Criar uma fila no BullMQ para simular o envio assíncrono de e-mails de confirmação de conta.
- **Aplicação Prática no Projecto:**
  - Investigar se a empresa utiliza Redis ou filas de mensagens e avaliar onde o caching traria maior impacto.
- **Entregável:** Serviço com cache activo e processamento de tarefas em background desacoplado do retorno HTTP.
- **Critérios de Conclusão:** Aceleração mensurável nas consultas em cache e requisições pesadas respondendo imediatamente com status 202 Accepted.

---

## FASE 6: PRODUÇÃO E ENTREGA (Semanas 11 e 12)

### Semana 11: Contentorização com Docker e Prontidão para Produção
- **Objectivos:** Empacotar e executar aplicações Node.js em contentores Docker optimizados, configurar Docker Compose para desenvolvimento multi-serviços e definir práticas de produção.
- **Conteúdos:**
  - Fundamentos do Docker: Imagens, Contentores, Volumes, Redes e Dockerfile.
  - Dockerfile multi-stage para Node.js com TypeScript: Compilação isolada e imagem de produção enxuta.
  - Execução de utilizador sem privilégios (`USER node`) por segurança.
  - Orquestração com Docker Compose: Subir Node.js API, PostgreSQL e Redis com uma única instrução.
  - Prontidão para produção: Healthchecks (`/health`), encerramento gracioso (Graceful Shutdown com `SIGTERM`/`SIGINT`).
  - Gestão segura de variáveis de ambiente em ambientes de CI/CD e produção.
- **Actividades e Exercícios:**
  - Escrever um `Dockerfile` multi-stage optimizado para a API.
  - Criar um ficheiro `docker-compose.yml` que orquestra a aplicação, a base de dados PostgreSQL e o Redis com volumes persistentes.
  - Implementar lógica de encerramento gracioso para fechar conexões activas com o PostgreSQL antes do processo morrer.
- **Aplicação Prática no Projecto:**
  - Analisar o Dockerfile e docker-compose do projecto da empresa e verificar se segue boas práticas de caching de camadas.
- **Entregável:** Ambiente completo containerizado e reprodutível com um único comando (`docker compose up`).
- **Critérios de Conclusão:** A imagem de produção deve conter apenas ficheiros compilados e dependências de produção, subindo sem erros e respondendo ao endpoint de healthcheck.

---

### Semana 12: Consolidação, Documentação OpenAPI/Swagger e Entrega
- **Objectivos:** Documentar integralmente a API com especificação OpenAPI/Swagger, realizar revisão técnica de arquitectura e segurança, e consolidar uma entrega de alto nível no projecto da empresa.
- **Conteúdos:**
  - Documentação viva de APIs: Especificação OpenAPI 3.0 e interface Swagger UI.
  - Geração de documentação a partir de código/schemas.
  - Revisão de boas práticas de Git: Commits semânticos (Conventional Commits), feature branching e elaboração de Pull Requests claros.
  - Preparação para Code Review: Análise estática com ESLint e Prettier, scripts de pré-commit (Husky).
  - Conclusão da funcionalidade Backend integrada no projecto da empresa.
  - Apresentação de resultados e métricas de evolução técnica à equipa.
- **Actividades e Exercícios:**
  - Documentar todos os endpoints, esquemas de pedido e resposta com Swagger UI interactivo.
  - Elaborar o relatório final de evolução técnica no ficheiro `integracao-empresa/funcionalidades.md`.
- **Aplicação Prática no Projecto:**
  - Submeter uma funcionalidade robusta no projecto da empresa com documentação e testes completos.
- **Entregável:** API documentada via Swagger, funcionalidade corporativa entregue e consolidada com Pull Request profissional.
- **Critérios de Conclusão:** Qualquer desenvolvedor Frontend consegue consumir a API a partir do Swagger e a equipa aprova a entrega no repositório da empresa.
