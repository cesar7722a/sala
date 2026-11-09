# Exercícios — Semana 04: Arquitectura Backend, Padrões e SOLID

---

## Exercício 4.1: Hierarquia de Erros Customizados e Middleware Global (Básico)

### Enunciado
Cria uma classe base `AppError` que estende a classe nativa `Error` do JavaScript, adicionando propriedades de `statusCode` e indicador se o erro é operacional (erro esperado de negócio) ou de programação. Desenvolve um middleware global de captura de erros no Express para padronizar as respostas.

### Objectivo
Eliminar blocos `try/catch` repetitivos e garantir que respostas de erro internas (500) não exponham *stack traces* em produção.

### Conceitos Envolvidos
- Herança de `Error`.
- Middleware de tratamento de erros com 4 argumentos: `(err, req, res, next)`.
- Distinção entre erros operacionais e bugs não esperados.

### Requisitos
1. Criar `AppError` com `message`, `statusCode` (padrão 400) e `isOperational = true`.
2. Criar classes derivadas: `NotFoundError` (404), `UnauthorizedError` (401), `ConflictError` (409).
3. Middleware global que responde em formato JSON: `{ status: "error", message: string }`.

### Critérios de Avaliação
- [ ] Erros instanciados com `AppError` retornam o seu status code específico.
- [ ] Erros desconhecidos (ex.: erro de sintaxe) retornam 500 com mensagem genérica "Internal Server Error" sem vazar detalhes internos.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**

---

## Exercício 4.2: Refactorização para Camadas Controller-Service-Repository (Intermédio)

### Enunciado
Refactoriza um endpoint monolítico (onde toda a lógica de rota, validação de regras de negócio e manipulação de arrays/dados está dentro da função da rota Express) separando-o estritamente nas camadas: Controller, Service e Repository.

### Objectivo
Aplicar o Princípio da Responsabilidade Única (SRP) e desacoplar a regra de negócio do protocolo HTTP.

### Conceitos Envolvidos
- Controller: Apenas recebe `req`, chama o Service e devolve `res`.
- Service: Contém regras de negócio puras (ex.: não permitir criar item com nome duplicado) e lança `AppError`.
- Repository: Interface e implementação para consulta e persistência dos dados.

### Requisitos
1. Definir uma interface TypeScript `ITasksRepository` com métodos `create`, `findById`, `findByName`, `list`.
2. Criar `InMemoryTasksRepository` que implementa a interface.
3. Criar `CreateTaskService` que recebe o repositório no construtor (Injecção de Dependência).
4. Criar `TasksController` que instancia o service e trata o fluxo HTTP.

### Critérios de Avaliação
- [ ] O Service não importa nada do Express (`req`, `res` não existem no Service).
- [ ] O Service lança `ConflictError` se a tarefa já existir.
- [ ] O Controller não manipula dados directamente, apenas orquestra a chamada.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**

---

## Exercício 4.3: Inversão de Dependências e Factory de Serviços (Avançado)

### Enunciado
Implementa o Princípio da Inversão de Dependência (DIP) de forma que a aplicação possa alternar entre dois repositórios diferentes (`InMemoryRepository` para testes rápidos e `FileStorageRepository` para persistir dados num ficheiro JSON local) sem alterar uma única linha de código nos Services. Cria uma Factory de fabricação de serviços.

### Objectivo
Dominar o desacoplamento de alto nível entre módulos de alto nível (domínio) e módulos de baixo nível (infraestrutura).

### Conceitos Envolvidos
- Inversão de Dependência (DIP).
- Design Pattern: Factory Method.
- Contratos com Interfaces estritas.

### Requisitos
1. Criar `FileStorageTasksRepository` que grava e lê de um ficheiro `tasks.json`.
2. Criar `makeCreateTaskService()` que decide qual repositório injectar com base numa variável de ambiente `STORAGE_TYPE`.
3. Demonstrar a troca de repositório sem tocar no código de `CreateTaskService`.

### Critérios de Avaliação
- [ ] `CreateTaskService` depende exclusivamente da abstracção `ITasksRepository`.
- [ ] Mudança de persistência ocorre perfeitamente por configuração externa.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**
