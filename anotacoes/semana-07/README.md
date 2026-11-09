# Semana 07: Autenticação Segura e Gestão de Sessões (JWT)

## 1. Objectivos da Semana
- Compreender a diferença conceptual e prática entre Autenticação e Autorização.
- Implementar fluxos criptográficos de hashing seguro de senhas com Argon2 ou bcrypt (salt, custo de trabalho).
- Dominar a criação, assinatura e verificação matemática de JSON Web Tokens (JWT).
- Desenvolver a estratégia completa de Access Token (curto ciclo de vida) e Refresh Token (rotação segura).
- Construir um middleware de autenticação para extrair o token do cabeçalho `Authorization: Bearer <token>` e injectar o utilizador autenticado no objecto `req`.

## 2. Conteúdos Previstos
- [ ] Fundamentos de segurança em autenticação stateless.
- [ ] Mecânica interna do hashing (funções unidireccionais, timing attacks, rainbow tables).
- [ ] Anatomia de um JWT: Header, Payload e Assinatura com chave secreta.
- [ ] Rotação e invalidação de Refresh Tokens na base de dados.
- [ ] Middleware `ensureAuthenticated` e tipagem do `Express.Request` com dados do utilizador.
- [ ] Boas práticas no armazenamento de tokens pelo cliente (HTTP-only cookies vs LocalStorage).

## 3. Exercícios Práticos da Semana
Consulta o caderno de exercícios em: [`../../exercicios/semana-07.md`](file:///home/cesar-antonio/Documentos/projectos/nodejs-backend-roadmap/exercicios/semana-07.md)

## 4. Aplicação no Projecto da Empresa
- Analisar a implementação do fluxo de login e renovação de sessão da empresa.
- Verificar como as senhas são armazenadas e se os segredos de JWT estão bem protegidos por variáveis de ambiente.

## 5. Dúvidas e Conclusões
- Dúvida 1:
- Dúvida 2:
