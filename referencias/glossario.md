# Glossário Técnico de Backend e Node.js

Este glossário reúne termos e conceitos fundamentais de engenharia de software para consulta rápida.

---

### A
- **ACID (Atomicidade, Consistência, Isolamento, Durabilidade):** Conjunto de quatro propriedades fundamentais que garantem que as transacções numa base de dados relacional são executadas de forma fiável e segura.
- **Argon2:** Algoritmo moderno e altamente resistente a ataques de força bruta com hardware especializado (GPUs e ASICs), vencedor da Password Hashing Competition (PHC).
- **Async/Await:** Açúcar sintáctico (*syntactic sugar*) introduzido no ECMAScript 2017 para escrever código assíncrono com a legibilidade e estrutura do código síncrono, operando sobre Promises.

### B
- **Backpressure:** Mecanismo de controlo de fluxo no processamento de dados (como Streams) onde o consumidor lento sinaliza ao produtor rápido para abrandar a emissão de dados, evitando exaustão de memória RAM.
- **BOLA (Broken Object Level Authorization):** Vulnerabilidade (antigamente conhecida como IDOR) em que um endpoint permite que um utilizador aceda ou altere dados de outro utilizador simplesmente manipulando o identificador (ID) enviado na rota.
- **Buffer:** Classe nativa do Node.js projectada para manipular sequências directas de bytes brutos fora da pilha de memória do motor V8.
- **BullMQ:** Biblioteca de processamento de filas de tarefas assíncronas em segundo plano (*background jobs*) baseada em Redis, com suporte a retries, prioridades e workers concorrentes.

### C
- **Clean Architecture:** Paradigma arquitectural proposto por Robert C. Martin que organiza o software em camadas concêntricas, onde as regras de negócio de domínio residem no centro e nunca dependem de bibliotecas, frameworks externas ou bases de dados.
- **CommonJS (CJS):** Sistema clássico de módulos do Node.js baseado nas funções síncronas `require()` e no objecto `module.exports`.
- **CORS (Cross-Origin Resource Sharing):** Mecanismo de segurança dos navegadores que utiliza cabeçalhos HTTP adicionais para informar aos navegadores se uma aplicação web de uma origem (domínio) tem permissão para aceder a recursos de uma origem diferente.

### D
- **DTO (Data Transfer Object):** Objecto sem comportamento de negócio cujo único objectivo é transportar dados estruturados e tipados entre subsistemas ou camadas lógicas (ex.: entre o Controller e o Service).

### E
- **ES Modules (ESM):** Padrão oficial da linguagem JavaScript para gestão estática de módulos através das instruções `import` e `export`.
- **Event Loop:** Mecanismo central da biblioteca libuv e do Node.js responsável por orquestrar a execução de operações não-bloqueantes de I/O num único fluxo de execução principal (*single-thread*), delegando tarefas bloqueantes ao sistema operacional ou à pool interna de threads.

### H
- **Helmet:** Colecção de middlewares de segurança para Express que configura automaticamente cabeçalhos HTTP defensivos (como HSTS, Content-Security-Policy e X-Frame-Options).

### I
- **Idempotência:** Propriedade de uma operação pela qual a sua execução múltipla produz exactamente o mesmo resultado e o mesmo estado no servidor que uma execução única (ex.: métodos HTTP GET, PUT e DELETE são idempotentes; POST não é).
- **Inversão de Dependências (DIP):** O último princípio do SOLID, que dita que módulos de alto nível não devem depender de módulos de baixo nível; ambos devem depender de abstracções (interfaces).

### J
- **JWT (JSON Web Token):** Padrão aberto (RFC 7519) compacto e autocontido utilizado para transmitir dados assinados de forma segura entre partes no formato JSON, amplamente utilizado em autenticação stateless.

### L
- **libuv:** Biblioteca multiplataforma desenvolvida em C/C++ que provê suporte ao Event Loop, pooling de threads de background para o sistema de ficheiros, sockets de rede e operações assíncronas do Node.js.

### M
- **Middleware:** Função ou cadeia de funções com acesso aos objectos de requisição (`req`), de resposta (`res`) e à função de prosseguimento (`next()`), utilizada para executar tarefas transversais (autenticação, logging, validação).

### P
- **Problema de Consulta N+1:** Gargalo crítico em ORMs onde a aplicação executa 1 consulta inicial para buscar N registos principais e, em seguida, dispara N consultas adicionais para obter as relações de cada um, degradando a performance. Resolvido com `JOINs`, `include` ou `eager loading`.

### R
- **RBAC (Role-Based Access Control):** Abordagem de autorização em que as permissões de acesso ao sistema são atribuídas a papéis (*roles*) pré-definidos (ex.: `ADMIN`, `MANAGER`, `USER`), e os utilizadores são associados a esses papéis.
- **REST (Representational State Transfer):** Estilo arquitectural para sistemas hipermedia distribuídos baseado nas propriedades e verbos do protocolo HTTP, representações em formatos comuns (como JSON) e comunicação estritamente sem estado (*stateless*).

### S
- **SOLID:** Acrónimo para cinco princípios fundamentais da programação orientada a objectos e concepção de software: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation e Dependency Inversion.
- **Streams:** Abstracção fundamental no Node.js para leitura e escrita de dados sequenciais em pedaços contínuos (*chunks*), permitindo processar ficheiros infinitos ou volumosos sem sobrecarregar a memória RAM.

### T
- **TTL (Time-To-Live):** Tempo de expiração definido para um dado gravado em memória ou cache (como no Redis), após o qual a chave é eliminada automaticamente.

### V
- **V8 Engine:** Motor de execução de JavaScript e WebAssembly em código aberto de alta performance, desenvolvido pela Google em C++, responsável por compilar o código JavaScript directamente para linguagem de máquina através de compilação Just-In-Time (JIT).

### Z
- **Zod:** Biblioteca de declaração e validação de esquemas de dados em TypeScript, caracterizada pela capacidade de inferir tipos estáticos a partir de regras dinâmicas de validação em runtime.
