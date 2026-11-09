# Semana 08: Autorização (RBAC) e Segurança Defensiva de APIs

## 1. Objectivos da Semana
- Compreender e implementar modelos de controlo de acesso baseado em papéis (RBAC - Role-Based Access Control).
- Desenvolver middlewares de autorização granulares para proteger rotas por nível de permissão (ex.: Administrador, Gestor, Utilizador padrão).
- Configurar políticas seguras de CORS (Cross-Origin Resource Sharing).
- Mitigar ataques de força bruta e sobrecarga com Rate Limiting e protecção de cabeçalhos via Helmet.
- Estudar e prevenir as vulnerabilidades mais comuns do OWASP API Security Top 10 (BOLA/IDOR, Broken Authentication, Mass Assignment, SQL Injection).

## 2. Conteúdos Previstos
- [ ] Modelos de Controlo de Acesso: RBAC vs ABAC.
- [ ] Construção de middleware funcional de autorização por papéis.
- [ ] Protecção contra BOLA (Broken Object Level Authorization / IDOR).
- [ ] Configuração rigorosa de CORS e origens confiáveis.
- [ ] Limitação de taxa de requisições com `express-rate-limit`.
- [ ] Blindagem de cabeçalhos HTTP com `helmet`.
- [ ] Princípio do menor privilégio e sanitização de dados.

## 3. Exercícios Práticos da Semana
Consulta o caderno de exercícios em: [`../../exercicios/semana-08.md`](file:///home/cesar-antonio/Documentos/projectos/nodejs-backend-roadmap/exercicios/semana-08.md)

## 4. Aplicação no Projecto da Empresa
- Verificar como é controlado o acesso a funcionalidades administrativas na API da empresa.
- Avaliar a vulnerabilidade a BOLA (ver se um utilizador consegue aceder aos dados de outro apenas alterando o ID na rota).
- Verificar se existem protecções activas de Rate Limiting e cabeçalhos Helmet.

## 5. Dúvidas e Conclusões
- Dúvida 1:
- Dúvida 2:
