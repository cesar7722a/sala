# Exercícios — Semana 08: Autorização (RBAC) e Segurança Defensiva de APIs

---

## Exercício 8.1: Middleware de Controlo de Acesso Baseado em Papéis (RBAC) (Básico)

### Enunciado
Adiciona a propriedade `role` (enum: `ADMIN`, `MEMBER`) ao utilizador no payload do JWT e no modelo de dados. Desenvolve uma função middleware de autorização `hasRole(allowedRoles: Role[])` que restringe o acesso a determinados endpoints apenas a quem possui o papel autorizado.

### Objectivo
Implementar autorização em camadas após a autenticação, devolvendo o código HTTP 403 Forbidden para utilizadores autenticados mas não autorizados.

### Conceitos Envolvidos
- RBAC (Role-Based Access Control).
- Códigos HTTP: 401 Unauthorized (falta quem é) vs 403 Forbidden (sabe quem é, mas não tem permissão).
- Composição de middlewares no Express.

### Requisitos
1. Rota `POST /products` acessível apenas por `ADMIN`.
2. Rota `GET /products` acessível por `ADMIN` e `MEMBER`.
3. Middleware deve verificar `req.user.role` previamente preenchido pelo middleware de autenticação.

### Critérios de Avaliação
- [ ] Retorna 403 Forbidden caso o utilizador seja `MEMBER` e tente criar um produto.
- [ ] Executa sem erro quando o utilizador é `ADMIN`.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**

---

## Exercício 8.2: Mitigação de BOLA / IDOR (Broken Object Level Authorization) (Intermédio)

### Enunciado
Identifica e corrige a vulnerabilidade de autorização a nível de objecto (BOLA) no endpoint de alteração de dados de utilizador (`PUT /users/:id`). Apenas o próprio utilizador titular da conta ou um utilizador com perfil `ADMIN` pode actualizar o recurso em questão.

### Objectivo
Compreender a vulnerabilidade número 1 do OWASP API Security Top 10 e implementar validação defensiva de posse do recurso (*Ownership Check*).

### Conceitos Envolvidos
- OWASP API1:2023 - Broken Object Level Authorization.
- Verificação de posse (`resource.userId === authenticatedUser.id`).
- Lançamento de excepção `ForbiddenError`.

### Requisitos
1. Criar o Service ou Middleware de validação de posse.
2. Simular um utilizador A autenticado a tentar actualizar a conta do utilizador B.
3. Bloquear a operação com status 403.

### Critérios de Avaliação
- [ ] O ID enviado na rota é comparado com o ID autenticado presente no token.
- [ ] Administradores continuam autorizados a actualizar qualquer utilizador.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**

---

## Exercício 8.3: Blindagem Defensiva com Helmet, CORS e Rate Limiting (Avançado)

### Enunciado
Configura a camada de infraestrutura de segurança da aplicação Express:
1. Configuração de `helmet` com protecção de cabeçalhos de segurança contra Clickjacking, MIME Sniffing e Cross-Site Scripting.
2. Configuração de `cors` aceitando requisições apenas de origens autorizadas (whitelist definida por variável de ambiente).
3. Configuração de `express-rate-limit` global e um limitador agressivo específico para a rota de login `/sessions` (máximo de 5 tentativas por IP a cada 15 minutos).

### Objectivo
Proteger o servidor contra ataques automatizados de força bruta, abuso de recursos e ataques de negação de serviço básicos.

### Conceitos Envolvidos
- HTTP Security Headers (HSTS, CSP, X-Frame-Options).
- CORS Preflight (`OPTIONS`), `Origin` headers.
- Rate Limiting e cabeçalhos `RateLimit-Limit`, `RateLimit-Remaining`, `Retry-After`.

### Requisitos
1. Instalar e configurar `helmet`, `cors`, `express-rate-limit`.
2. Criar `loginRateLimiter` para o endpoint de autenticação.
3. Ao exceder 5 tentativas no login, retornar status 429 Too Many Requests com mensagem clara.

### Critérios de Avaliação
- [ ] Cabeçalhos de segurança confirmados no curl/Postman.
- [ ] Origem desconhecida no CORS é bloqueada.
- [ ] 6º pedido em menos de 15 minutos na rota de login é imediatamente bloqueado com status 429.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**
