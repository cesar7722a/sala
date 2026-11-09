# Projecto Prático 01: API REST Modular de Gestão de Tarefas

---

## 1. Descrição do Projecto
O **Projecto Prático 01** consiste na concepção e desenvolvimento de uma API RESTful completa para organização de tarefas e categorias de produtividade pessoal. O projecto foca-se na arquitectura de código em camadas, sem acoplamento a bibliotecas externas de base de dados (utilizando inicialmente armazenamento em memória com repositórios desacoplados), servindo como base sólida para dominar o ciclo HTTP no Node.js.

---

## 2. Objectivos
- Consolidar a separação em camadas lógicas: Controllers, Services e Repositories.
- Praticar a criação de middlewares de auditoria, cálculo de tempo de resposta e tratamento global de erros.
- Aplicar princípios SOLID (em especial SRP e DIP) com contratos de interfaces estritos em TypeScript.
- Dominar o tratamento de respostas HTTP semânticas (200, 201, 204, 400, 404, 409, 500).

---

## 3. Requisitos Funcionais (RF)
- [ ] **RF01:** O sistema deve permitir criar uma nova categoria (nome obrigatório e único).
- [ ] **RF02:** O sistema deve listar todas as categorias registadas.
- [ ] **RF03:** O sistema deve permitir criar uma nova tarefa vinculada a uma categoria existente.
- [ ] **RF04:** O sistema deve permitir listar tarefas com suporte a filtros por status (concluída/pendente), categoria e busca por título.
- [ ] **RF05:** O sistema deve permitir actualizar os dados de uma tarefa (título, descrição, categoria, status de conclusão).
- [ ] **RF06:** O sistema deve permitir alternar o status de conclusão de uma tarefa através de um endpoint específico (`PATCH /tasks/:id/toggle`).
- [ ] **RF07:** O sistema deve permitir eliminar uma tarefa por ID.

---

## 4. Requisitos Não Funcionais (RNF)
- [ ] **RNF01:** A aplicação deve ser desenvolvida em **TypeScript** com o compilador configurado em modo estrito (`strict: true`).
- [ ] **RNF02:** A lógica de negócio deve estar 100% isolada em Services e não conter qualquer dependência do Express (`req`, `res`).
- [ ] **RNF03:** Os erros de domínio devem ser instâncias de `AppError` e interceptados por um middleware global de erro.
- [ ] **RNF04:** O tempo de resposta de cada requisição deve ser adicionado aos cabeçalhos HTTP através do header `X-Response-Time`.
- [ ] **RNF05:** As operações de persistência devem seguir uma interface `ITasksRepository` para permitir fácil substituição futura.

---

## 5. Tecnologias
- **Runtime:** Node.js (LTS v20+)
- **Linguagem:** TypeScript
- **Framework Web:** Express.js
- **Execução em Desenvolvimento:** `tsx`
- **Armazenamento:** Em memória (*In-Memory Repository Pattern*)

---

## 6. Funcionalidades Detalhadas
1. **Módulo de Categorias:**
   - `POST /categories` - Cria categoria.
   - `GET /categories` - Lista categorias.
2. **Módulo de Tarefas:**
   - `POST /tasks` - Cria tarefa.
   - `GET /tasks` - Lista tarefas (com paginação e filtros).
   - `GET /tasks/:id` - Detalha uma tarefa específica.
   - `PUT /tasks/:id` - Actualiza dados da tarefa.
   - `PATCH /tasks/:id/toggle` - Alterna status de conclusão.
   - `DELETE /tasks/:id` - Remove tarefa.

---

## 7. Modelo de Dados (Em Memória)

### Entidade Category
```typescript
interface Category {
  id: string; // UUID v4
  name: string;
  createdAt: Date;
}
```

### Entidade Task
```typescript
interface Task {
  id: string; // UUID v4
  title: string;
  description?: string;
  categoryId: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 8. Critérios de Conclusão
- [ ] Todos os endpoints respondem de acordo com as especificações HTTP.
- [ ] Nenhuma regra de negócio reside dentro dos Controllers.
- [ ] Tratamento global de erros captura falhas sem quebrar a execução do processo Node.js.
- [ ] Código limpo, tipado e sem advertências no compilador TypeScript.

---

## 9. Possíveis Melhorias Futuras
- Adicionar paginação formal por cursor.
- Implementar persistência local em ficheiro JSON via Streams.
- Adicionar filtros por data de criação.
