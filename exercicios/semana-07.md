# Exercícios — Semana 07: Autenticação Segura e Gestão de Sessões (JWT)

---

## Exercício 7.1: Serviço de Criptografia de Palavras-passe (Básico)

### Enunciado
Implementa um serviço ou módulo utilitário `PasswordHashService` que utiliza Argon2 ou bcrypt para gerar hashes seguros e verificar se senhas em texto limpo correspondem ao hash gravado.

### Objectivo
Compreender como algoritmos de derivação de chaves protegem contra ataques de dicionário e tabelas de arco-íris (*Rainbow Tables*).

### Conceitos Envolvidos
- `argon2.hash()` e `argon2.verify()` (ou `bcrypt.hash()` com salt factor mínimo de 10).
- Armazenamento unidireccional de credenciais.

### Requisitos
1. Criar o ficheiro `src/utils/password-hasher.ts`.
2. Método `hash(plainText: string): Promise<string>`.
3. Método `compare(plainText: string, hash: string): Promise<boolean>`.
4. Testar o comportamento com senhas correctas e incorretas.

### Critérios de Avaliação
- [ ] O mesmo texto simples gera hashes diferentes a cada execução (devido ao sal aleatório).
- [ ] Validação booleana correcta e imune a comparação insegura de strings.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**

---

## Exercício 7.2: Emissão e Middleware de Verificação de JWT (Intermédio)

### Enunciado
Desenvolve os endpoints `/sessions` (login) e `/profile` (rota privada). No login, após validar credenciais, gera um token JWT assinado com segredo e validade de 15 minutos contendo o ID do utilizador no payload. Cria o middleware `ensureAuthenticated` que valida o token no cabeçalho `Authorization: Bearer <token>`, extrai o ID do utilizador e disponibiliza-o em `req.user.id`.

### Objectivo
Implementar a verificação de integridade e assinatura de tokens stateless sem consultar a base de dados em cada chamada.

### Conceitos Envolvidos
- Biblioteca `jsonwebtoken` (`jwt.sign`, `jwt.verify`).
- Extensão de tipos do Express (`declare global { namespace Express { interface Request { user: ... } } }`).
- Retornos 401 Unauthorized para tokens ausentes, expirados ou inválidos.

### Requisitos
1. Middleware `ensureAuthenticated` implementado e tipado.
2. Rota `/profile` devolve os dados do utilizador autenticado sem a senha.
3. Se o token estiver expirado, retornar mensagem amigável: "Token de autenticação expirado".

### Critérios de Avaliação
- [ ] Bloqueio eficaz para pedidos sem cabeçalho ou com token adulterado.
- [ ] Extensão de tipos TypeScript funcional sem recorrer a `as any`.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**

---

## Exercício 7.3: Rotação de Refresh Tokens e Invalidação de Sessão (Avançado)

### Enunciado
Projecta a estratégia completa de renovação de sessão:
1. No login, a API devolve um `accessToken` (expira em 15 minutos) e um `refreshToken` (expira em 7 dias).
2. O `refreshToken` é gravado na base de dados associado ao utilizador.
3. Cria a rota `POST /sessions/refresh` que recebe o refresh token, verifica a validade na base de dados, emite um novo par de tokens e revoga o refresh token anterior (*Refresh Token Rotation*).

### Objectivo
Blindar a segurança da API reduzindo a janela de exposição de tokens de acesso comprometidos e permitindo a revogação activa de sessões.

### Conceitos Envolvidos
- Rotação de Refresh Token (*Token Rotation*).
- Persistência e invalidação de sessão na base de dados.
- Detecção de reaproveitamento de tokens antigos (indicador de potencial roubo de token).

### Requisitos
1. Modelar tabela `RefreshToken` associada a `User`.
2. Implementar `RefreshTokenService`.
3. Ao usar um refresh token, o mesmo deve ser invalidado e gerado um novo.

### Critérios de Avaliação
- [ ] Tentativa de usar um refresh token já revogado resulta em 401 e revoga todas as sessões activas do utilizador.
- [ ] Transição suave para clientes Frontend sem necessidade de novo login manual enquanto o refresh for válido.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**
