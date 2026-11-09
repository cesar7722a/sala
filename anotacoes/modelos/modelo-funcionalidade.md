# Modelo de Registo de Funcionalidade Corporativa

Utiliza este template para documentar cada funcionalidade, refactorização ou correcção implementada no projecto da empresa.

> [!IMPORTANT]
> **Confidencialidade e Segurança:** Nunca incluas chaves secretas, senhas, URLs internas com credenciais, dados de clientes ou blocos inteiros de código proprietário. Utiliza nomes genéricos e foca-te na arquitectura e na engenharia da solução.

---

## 1. Identificação Geral
- **Nome da Funcionalidade:** [Ex.: Middleware de Validação de Pedidos / Paginação Dinâmica na Listagem de Utilizadores]
- **Data de Conclusão / Entrega:** AAAA-MM-DD
- **Semana do Roadmap Correspondente:** Semana XX (ex.: Semana 06 - Validação)
- **Pull Request / Branch:** [Identificador interno, ex.: `feat/pagination-users`]

---

## 2. Problema que Pretende Resolver
[Descreve de forma clara qual era o estrangulamento, bug ou necessidade de negócio existente antes da implementação]

---

## 3. Conceitos Técnicos Utilizados
- Ex.: Inversão de dependência, schemas com Zod, transacções atómicas no Prisma, paginação por cursor, etc.

---

## 4. Ficheiros ou Módulos Envolvidos
*(Indicar apenas caminhos relativos e responsabilidades de alto nível)*
- `src/controllers/...`: Recepção e desestruturação de parâmetros HTTP.
- `src/services/...`: Implementação da lógica de negócio e validações de domínio.
- `src/repositories/...`: Interacção com a base de dados via ORM.

---

## 5. Implementação Realizada
[Explicação da abordagem arquitectural escolhida, padrões de desenho utilizados e por que motivo essa abordagem foi superior a outras alternativas]

---

## 6. Testes Executados
- [ ] Testes unitários com mocks dos repositórios.
- [ ] Testes de integração simulando chamadas HTTP reais.
- [ ] Testes manuais via cliente HTTP (Postman/Insomnia/Thunder Client).
- [ ] Validação de casos de erro (cenários 400, 401, 404, 500).

---

## 7. Resultado Obtido
[Métricas de impacto ou benefícios práticos: redução de tempo de resposta, eliminação de erros não tratados, melhoria da experiência para o Frontend, código mais limpo para a equipa]

---

## 8. Dificuldades Encontradas
[Quais foram os principais bloqueios durante o desenvolvimento e como foram superados]

---

## 9. O que Aprendi
[Reflexão técnica pessoal: o que esta entrega acrescentou à tua evolução de Frontend para Backend Developer]
