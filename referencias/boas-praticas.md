# Guia de Boas Práticas de Engenharia Backend

Este guia compila os princípios, convenções e directrizes técnicas fundamentais para construir aplicações Backend robustas, sustentáveis e seguras em Node.js e TypeScript.

---

## 1. Princípios Arquitecturais e Separação de Camadas

### A Arquitectura em Três Camadas (Controller-Service-Repository)
- **Camada de Transporte / Controladores (Controllers):**
  - Responsabilidade única: receber os pedidos HTTP (`Request`), extrair parâmetros (`body`, `query`, `params`), invocar os Services apropriados e formatar a resposta HTTP (`Response`).
  - **Regra:** Nunca deves colocar regras de negócio, cálculos matemáticos, queries de base de dados ou validações profundas de domínio dentro de um Controller.
- **Camada de Regras de Negócio (Services):**
  - O coração da aplicação. Executa as regras de validação de domínio (ex.: validar se o utilizador já existe, verificar saldo suficiente, disparar regras de transacção).
  - **Regra:** Os Services devem ser completamente agnósticos do protocolo HTTP. Não devem importar nem receber objectos `req`, `res` ou `next` do Express.
- **Camada de Acesso a Dados (Repositories):**
  - Responsável pela comunicação com o mecanismo de persistência (Prisma, PostgreSQL, Redis, etc.).
  - **Regra:** Devem ser sempre abstraídos por Interfaces TypeScript (ex.: `IUsersRepository`), permitindo substituir a base de dados ou criar mocks para testes sem alterar os Services.

---

## 2. Princípios SOLID Aplicados ao Backend
1. **Single Responsibility Principle (SRP):** Cada classe, função ou módulo deve ter um e apenas um motivo para mudar. (Exemplo: um Service de criação de utilizador não deve ser responsável por enviar e-mails ou formatar respostas HTTP).
2. **Open/Closed Principle (OCP):** Módulos de software devem estar abertos para extensão, mas fechados para modificação directa.
3. **Liskov Substitution Principle (LSP):** Subclasses ou implementações de repositórios devem poder ser substituídas pelas suas classes base ou interfaces sem quebrar a consistência do sistema.
4. **Interface Segregation Principle (ISP):** Não force clientes ou módulos a dependerem de métodos que não utilizam. Prefira múltiplas interfaces pequenas e específicas a uma interface monolítica e pesada.
5. **Dependency Inversion Principle (DIP):** Dependa de abstracções (interfaces) e não de implementações concretas. Injecte dependências pelo construtor.

---

## 3. Boas Práticas na Concepção de APIs REST
- **Utilização Semântica de Verbos HTTP:**
  - `GET`: Obtenção segura e idempotente de recursos. Nunca deve alterar o estado do servidor.
  - `POST`: Criação de recursos subordinados ou execução de comandos não idempotentes.
  - `PUT`: Substituição integral de um recurso.
  - `PATCH`: Actualização parcial de propriedades de um recurso.
  - `DELETE`: Remoção de um recurso.
- **Códigos de Status HTTP Previsíveis:**
  - `200 OK`: Sucesso com retorno de dados.
  - `201 Created`: Recurso criado com sucesso (retornar o objecto criado).
  - `204 No Content`: Sucesso sem conteúdo no corpo de resposta (típico de DELETE ou actualizações sem dados de retorno).
  - `400 Bad Request`: Parâmetros de entrada inválidos ou payload malformado.
  - `401 Unauthorized`: Falta de autenticação (token ausente, inválido ou expirado).
  - `403 Forbidden`: Utilizador autenticado, mas sem permissão de acesso ao recurso específico.
  - `404 Not Found`: Recurso pesquisado não existe na base de dados.
  - `409 Conflict`: Conflito de estado (ex.: tentativa de registo com e-mail já existente).
  - `422 Unprocessable Entity`: Erros semânticos na validação de regras de negócio.
  - `500 Internal Server Error`: Falhas inesperadas do servidor.
- **Paginação Obrigatória em Colecções:**
  - Nunca retornar colecções abertas sem limite (`SELECT * FROM table`). Forçar sempre limites padrão (`limit=20`, `maxLimit=50` ou `100`).

---

## 4. Segurança Defensiva e OWASP API Security
- **Nunca confiar em dados externos:** Todas as entradas provenientes de `req.body`, `req.query` e `req.params` devem ser validadas em runtime utilizando schemas declarativos (ex.: Zod).
- **Protecção contra Broken Object Level Authorization (BOLA):** Ao aceder ou manipular dados privados (`/users/:id`, `/orders/:id`), valide sempre se o utilizador autenticado é o proprietário legítimo do recurso ou se possui papel de administrador.
- **Senhas e Criptografia:** Utilize sempre algoritmos com funções de derivação lenta de chaves e salt aleatório (Argon2id ou bcrypt). Nunca salve senhas em texto puro.
- **Cabeçalhos de Segurança:** Utilize o middleware `helmet` para aplicar cabeçalhos preventivos contra ataques XSS, clickjacking e MIME-sniffing.
- **Rate Limiting:** Aplique limitadores de requisição nas rotas públicas e críticas (especialmente login e recuperação de palavra-passe) para mitigar força bruta e sobrecarga.
- **Gestão de Segredos:** Guarde chaves criptográficas, senhas de bases de dados e URLs externas exclusivamente em variáveis de ambiente (`.env`). Nunca submeta ficheiros com credenciais reais para o repositório Git.

---

## 5. Gestão Centralizada de Erros
- Crie uma classe de erro de domínio (`AppError`) com o status code adequado.
- Lance erros dentro dos Services: `throw new AppError("Utilizador já existe", 409);`.
- Capture todos os erros através de um middleware global com 4 parâmetros: `(err: Error, req: Request, res: Response, next: NextFunction)`.
- Se o erro for uma instância de `AppError`, responda com o seu código de status e mensagem legível.
- Se for um erro desconhecido, logue o erro internamente com um logger estruturado (ex.: Pino) e responda ao utilizador com `500 Internal Server Error` sem expor a *stack trace* nem caminhos do servidor em ambiente de produção.

---

## 6. Qualidade, Testabilidade e Manutenibilidade
- Separe o ficheiro que configura a aplicação (`app.ts`) do ficheiro que inicia a escuta na porta TCP (`server.ts`). Desta forma, a suite de testes com Supertest pode importar o `app` sem abrir portas reais de rede.
- Mantenha os testes unitários independentes, rápidos e focados nos Services.
- Para testes de integração, utilize bases de dados dedicadas e limpas antes de cada execução para evitar falsos positivos ou testes interdependentes.
- Adopte o padrão de *Conventional Commits* (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`) para manter um histórico claro e rastreável.
