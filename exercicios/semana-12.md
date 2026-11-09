# Exercícios — Semana 12: Consolidação, Documentação OpenAPI/Swagger e Entrega

---

## Exercício 12.1: Documentação OpenAPI 3.0 com Swagger UI (Básico)

### Enunciado
Integra o Swagger UI na aplicação Express através da rota `/docs`. Documenta a especificação completa de pelo menos dois recursos principais (ex.: autenticação e listagem de produtos), incluindo esquemas de corpo de requisição, parâmetros de busca, cabeçalhos de autenticação Bearer e possíveis respostas de erro (400, 401, 404).

### Objectivo
Fornecer um contrato de API interactivo, claro e auto-explicativo para consumo por equipas de Frontend e clientes externos.

### Conceitos Envolvidos
- Especificação OpenAPI 3.0 (YAML ou JSON).
- `swagger-ui-express`.
- Definição de componentes e esquemas de segurança (`securitySchemes: bearerAuth`).

### Requisitos
1. Configurar rota `GET /docs` servindo a interface do Swagger UI.
2. Permitir que o utilizador insira o Bearer Token directamente no botão "Authorize" e teste requisições privadas pelo navegador.
3. Tipos e exemplos ilustrativos em todos os campos.

### Critérios de Avaliação
- [ ] Qualquer desenvolvedor consegue testar e entender a API sem necessidade de consultar o código fonte.
- [ ] Erros de validação e esquemas de sucesso reflectem com exactidão os tipos do TypeScript e do Zod.

### Espaço para Solução e Observações
```typescript
// Cola a tua configuração aqui
```
**Observações e Aprendizados:**

---

## Exercício 12.2: Padronização de Git e Commits Semânticos (Intermédio)

### Enunciado
Configura ferramentas de padronização de commits e análise de qualidade no repositório:
1. Configurar o padrão de *Conventional Commits* (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`).
2. Adicionar scripts de verificação estática (`npm run lint` com ESLint e `npm run format:check` com Prettier).
3. Simular e elaborar a descrição completa de um Pull Request no modelo corporativo para a funcionalidade final desenvolvida.

### Objectivo
Elevar a qualidade da colaboração técnica e assegurar histórico de versão limpo e legível por toda a equipa.

### Conceitos Envolvidos
- Especificação Conventional Commits 1.0.0.
- Estrutura de Pull Request profissional (Contexto, Mudanças Técnicas, Como Testar, Riscos).
- Linters e formatadores de código.

### Requisitos
1. Redigir o histórico de commits do teu projecto seguindo estritamente a convenção.
2. Criar um ficheiro `PULL_REQUEST_TEMPLATE.md` na raiz do projecto.

### Critérios de Avaliação
- [ ] Commits claros, imperativos e semânticos.
- [ ] Descrição de Pull Request suficiente para que outro engenheiro aprove com segurança.

### Espaço para Solução e Observações
```markdown
<!-- Cola o teu template de Pull Request aqui -->
```
**Observações e Aprendizados:**

---

## Exercício 12.3: Auditoria Final de Arquitectura e Segurança (Avançado)

### Enunciado
Realiza uma auditoria técnica completa de ponta a ponta na API desenvolvida ao longo da formação:
1. Validar que nenhum segredo ou credencial está exposto no código ou histórico do Git.
2. Verificar que 100% das rotas privadas possuem validação de autenticação e RBAC.
3. Confirmar que todas as entradas estão protegidas por validação de schemas em runtime com Zod.
4. Executar a suite completa de testes automatizados e validar se todos os testes passam sem falhas.

### Objectivo
Consolidar a transição profissional e garantir que a aplicação atinge níveis de maturidade adequados para produção corporativa.

### Conceitos Envolvidos
- Checklist de pré-produção.
- Auditoria de segurança de dependências (`npm audit`).
- Revisão arquitectural de camadas e princípios SOLID.

### Requisitos
1. Preencher a lista de verificação de prontidão.
2. Documentar quaisquer riscos residuais ou melhorias futuras recomendadas.
3. Apresentar o resultado ao mentor técnico.

### Critérios de Avaliação
- [ ] Sem vulnerabilidades críticas conhecidas no `npm audit`.
- [ ] Testes automatizados executam e passam em ambiente limpo.
- [ ] Prontidão total para deploy documentada.

### Espaço para Solução e Observações
```markdown
<!-- Regista o relatório de auditoria final aqui -->
```
**Observações e Aprendizados:**
