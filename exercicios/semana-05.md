# Exercícios — Semana 05: Bases de Dados Relacionais e ORM (PostgreSQL & Prisma)

---

## Exercício 5.1: Modelação Relacional e Migrações com Prisma (Básico)

### Enunciado
Projecta o esquema relacional para uma aplicação de e-commerce simples contendo as entidades: `User` (Utilizador), `Category` (Categoria) e `Product` (Produto). Cada produto pertence obrigatoriamente a uma categoria e possui um criador (User). Gera e executa a primeira migração com o Prisma CLI contra uma instância PostgreSQL.

### Objectivo
Dominar a sintaxe do `schema.prisma`, atributos de chave primária com UUID, campos obrigatórios/opcionais e a instrução `prisma migrate dev`.

### Conceitos Envolvidos
- `schema.prisma` (`datasource`, `generator`, `model`).
- `@id @default(uuid())`, `@unique`, `@relation`.
- Execução de migrações determinísticas.

### Requisitos
1. Configurar ficheiro `.env` com a string de ligação `DATABASE_URL`.
2. Modelar as relações 1:N (`Category -> Product` e `User -> Product`).
3. Criar a migração com `npx prisma migrate dev --name init_schema`.
4. Abrir o Prisma Studio (`npx prisma studio`) e inserir 1 utilizador, 1 categoria e 2 produtos manualmente.

### Critérios de Avaliação
- [ ] Schema compila sem advertências e o cliente é gerado via `prisma generate`.
- [ ] Integridade referencial garantida (não é possível criar um produto com categoria inexistente).
- [ ] Tabela e colunas geradas correctamente no PostgreSQL.

### Espaço para Solução e Observações
```prisma
// Cola o teu schema.prisma aqui
```
**Observações e Aprendizados:**

---

## Exercício 5.2: Repositório com Prisma Client e Prevenção do Problema N+1 (Intermédio)

### Enunciado
Implementa a camada de repositório `PrismaProductsRepository` utilizando o Prisma Client gerado. Desenvolve consultas avançadas que permitem listar produtos filtrados por categoria, incluindo os dados resumidos da categoria sem gerar consultas separadas para cada linha da base de dados.

### Objectivo
Aprender a usar o Prisma Client de forma performante com `include` e `select`, compreendendo o impacto de consultas relacionais.

### Conceitos Envolvidos
- Operações do Prisma: `findMany`, `create`, `findUnique`, `update`.
- Projecção de dados com `select` e relacionamento com `include`.
- Optimização contra consultas N+1.

### Requisitos
1. Criar o repositório `PrismaProductsRepository` implementando a interface de domínio.
2. Método `listByCategory(categoryId: string)` que devolve os produtos trazendo o nome da categoria no mesmo payload.
3. Não expor campos sensíveis caso o utilizador criador seja incluído.

### Critérios de Avaliação
- [ ] Consulta resolve dados relacionados numa única instrução SQL optimizada.
- [ ] Tipagem retornada reflecte com precisão os dados seleccionados.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**

---

## Exercício 5.3: Transacções Atómicas Interactivas de Pedidos e Gestão de Stock (Avançado)

### Enunciado
Modela a entidade `Order` (Pedido) e `OrderItem` (Item do Pedido). Desenvolve um serviço `CreateOrderService` que, ao receber a lista de produtos comprados, executa dentro de uma transacção atómica com `prisma.$transaction`:
1. Verifica se todos os produtos existem e possuem stock suficiente.
2. Decrementa o stock de cada produto.
3. Cria o registo do pedido com o valor total calculado.
Se qualquer produto não tiver stock suficiente, a transacção inteira deve ser abortada (*Rollback* automático) e nenhum stock alterado.

### Objectivo
Garantir consistência ACID em operações financeiras e de inventário no Backend.

### Conceitos Envolvidos
- `prisma.$transaction(async (tx) => { ... })`.
- Atomicidade e Rollback automático de transacções.
- Prevenção de condições de corrida (*Race Conditions*).

### Requisitos
1. Modelar `Order` e `OrderItem` no `schema.prisma` com migração aplicada.
2. Implementar a transacção interactiva completa.
3. Simular uma encomenda em que um dos itens não possui stock suficiente e comprovar que os outros itens não sofreram decremento.

### Critérios de Avaliação
- [ ] Em caso de erro em qualquer etapa da transacção, a base de dados permanece no estado original.
- [ ] Stock decrementado correctamente apenas em pedidos com sucesso.
- [ ] Lançamento de erro de domínio (`AppError`) com status 400.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**
