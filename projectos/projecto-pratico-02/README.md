# Projecto Prático 02: API de E-commerce com Autenticação e RBAC

---

## 1. Descrição do Projecto
O **Projecto Prático 02** consiste na construção de uma API Backend robusta para uma plataforma de comércio electrónico simplificada. Abrange a modelação relacional em PostgreSQL, migrações com Prisma ORM, validação de entradas em runtime com Zod, autenticação stateless via JWT com rotação de Refresh Tokens e controlo de acesso baseado em papéis (RBAC - Administradores vs Clientes).

---

## 2. Objectivos
- Modelar entidades relacionais complexas (Utilizadores, Produtos, Pedidos, Itens de Pedido) com integridade referencial.
- Implementar fluxos transaccionais atómicos (`prisma.$transaction`) para garantia de integridade de stock.
- Blindar todos os endpoints através de esquemas declarativos com Zod e middlewares desacoplados.
- Implementar hashing criptográfico de palavras-passe com Argon2 e autenticação JWT.
- Configurar segurança defensiva contra vulnerabilidades do OWASP API Security Top 10 (RBAC, Rate Limiting, Helmet, mitigação de BOLA).

---

## 3. Requisitos Funcionais (RF)
- [ ] **RF01:** O utilizador deve conseguir registar-se na plataforma com nome, e-mail e senha.
- [ ] **RF02:** O utilizador deve conseguir autenticar-se recebendo um par de `accessToken` e `refreshToken`.
- [ ] **RF03:** O utilizador autenticado deve conseguir renovar o seu access token através da rota de refresh.
- [ ] **RF04:** Apenas administradores (`role = ADMIN`) podem criar, actualizar stock ou desativar produtos.
- [ ] **RF05:** Qualquer utilizador (mesmo não autenticado) pode listar e pesquisar produtos disponíveis.
- [ ] **RF06:** Utilizadores autenticados podem realizar pedidos de compra de um ou mais produtos.
- [ ] **RF07:** O sistema deve verificar e abater stock em transacção única no momento do pedido.
- [ ] **RF08:** Clientes apenas podem consultar os seus próprios pedidos; administradores podem consultar pedidos de qualquer cliente.

---

## 4. Requisitos Não Funcionais (RNF)
- [ ] **RNF01:** Senhas nunca são salvas em texto simples; devem ser cifradas com Argon2 ou bcrypt.
- [ ] **RNF02:** Todas as entradas (`body`, `query`, `params`) devem ser estritamente validadas por schemas Zod.
- [ ] **RNF03:** A base de dados principal deve ser o PostgreSQL e o acesso a dados feito via Prisma Client.
- [ ] **RNF04:** A API deve implementar Rate Limiting agressivo na rota de autenticação (máximo 5 tentativas/15 min).
- [ ] **RNF05:** Cabeçalhos HTTP devem ser protegidos com a biblioteca Helmet.

---

## 5. Tecnologias
- **Runtime:** Node.js (LTS v20+)
- **Linguagem:** TypeScript
- **Framework Web:** Express.js
- **Base de Dados:** PostgreSQL
- **ORM:** Prisma
- **Validação de Schemas:** Zod
- **Autenticação:** JWT (`jsonwebtoken`)
- **Criptografia:** Argon2 ou bcrypt
- **Segurança:** Helmet, CORS, express-rate-limit

---

## 6. Funcionalidades Detalhadas
1. **Módulo de Autenticação e Utilizadores:**
   - `POST /users` - Registo de novo utilizador.
   - `POST /sessions` - Login e emissão de tokens.
   - `POST /sessions/refresh` - Rotação de Refresh Token.
   - `GET /me` - Perfil do utilizador autenticado.
2. **Módulo de Produtos:**
   - `POST /products` - Criação de produto (apenas ADMIN).
   - `GET /products` - Listagem pública de produtos com paginação e busca por preço/categoria.
   - `PATCH /products/:id/stock` - Actualização manual de inventário (apenas ADMIN).
3. **Módulo de Pedidos:**
   - `POST /orders` - Criação de pedido com transacção e validação de stock.
   - `GET /orders` - Listagem de pedidos (restringida por ownership/RBAC).
   - `GET /orders/:id` - Detalhe do pedido com validação contra BOLA.

---

## 7. Modelo de Dados (Prisma Schema Relacional)

```prisma
enum Role {
  ADMIN
  CUSTOMER
}

enum OrderStatus {
  PENDING
  PAID
  CANCELLED
}

model User {
  id           String        @id @default(uuid())
  name         String
  email        String        @unique
  passwordHash String
  role         Role          @default(CUSTOMER)
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  orders       Order[]
  refreshTokens RefreshToken[]
}

model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
}

model Product {
  id          String      @id @default(uuid())
  title       String
  description String
  priceInCents Int
  stock       Int
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  orderItems  OrderItem[]
}

model Order {
  id          String      @id @default(uuid())
  userId      String
  user        User        @relation(fields: [userId], references: [id])
  status      OrderStatus @default(PENDING)
  totalAmount Int
  createdAt   DateTime    @default(now())
  items       OrderItem[]
}

model OrderItem {
  id           String   @id @default(uuid())
  orderId      String
  order        Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId    String
  product      Product  @relation(fields: [productId], references: [id])
  quantity     Int
  priceInCents Int
}
```

---

## 8. Critérios de Conclusão
- [ ] Todas as migrações correm com sucesso no PostgreSQL.
- [ ] Transacção de pedidos garante que nunca ocorre venda de produto sem stock.
- [ ] Tentativas de BOLA devolvem status 403 Forbidden.
- [ ] Nenhum segredo ou token confidencial exposto em logs ou respostas da API.

---

## 9. Possíveis Melhorias Futuras
- Integração com gateway de pagamentos simulado via Webhooks.
- Expansão para suporte a cupons de desconto.
- Notificação de confirmação de compra.
