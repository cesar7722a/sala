# Propostas de Melhorias Técnicas para a Empresa

Utiliza este ficheiro para estruturar propostas de evolução antes de as apresentares ao teu responsável técnico ou equipa. Uma proposta bem fundamentada, com foco em valor e redução de riscos, é a melhor forma de demonstrar iniciativa e crescimento profissional.

---

## Estrutura de Apresentação de uma Melhoria

Sempre que identificares uma oportunidade de melhoria no projecto corporativo, estrutura a proposta seguindo estes 5 pontos essenciais:

1. **O Problema Identificado:** O que está ineficiente, inseguro ou frágil actualmente?
2. **A Solução Proposta:** Qual é a abordagem técnica recomendada?
3. **Ficheiros e Módulos Afectados:** Qual é o alcance da alteração no repositório?
4. **Riscos e Efeitos Secundários:** O que pode falhar e como mitigar esse risco?
5. **Testes Necessários:** Como podemos comprovar que a melhoria funciona sem introduzir regressões?

---

## Exemplo: Proposta de Tratamento Centralizado de Erros

### 1. Problema Identificado
Identificou-se que múltiplos controladores possuem blocos `try/catch` extensos onde cada desenvolvedor formata a resposta de erro de maneira diferente (uns retornam `{ error: "msg" }`, outros `{ message: "msg" }` e outros apenas strings puras). Além disso, falhas não tratadas em funções assíncronas estavam a provocar `UnhandledPromiseRejection`.

### 2. Solução Proposta
Implementar uma classe `AppError` unificada e um middleware global de tratamento de erros ao final da cadeia de rotas do Express. Todos os Services passam a lançar `throw new AppError(...)` e o middleware encarrega-se da formatação padronizada e do status HTTP correcto.

### 3. Ficheiros Afectados
- `src/errors/AppError.ts` (novo ficheiro).
- `src/middlewares/errorHandler.ts` (novo ficheiro).
- `src/app.ts` (registo do middleware após as rotas).
- Refactorização gradual dos controladores existentes para remover formatações manuais de erro.

### 4. Riscos e Mitigação
- *Risco:* Algum cliente Frontend antigo pode estar a depender do formato de erro anterior específico.
- *Mitigação:* Manter temporariamente retrocompatibilidade no formato do JSON ou alinhar previamente com a equipa de Frontend.

### 5. Plano de Testes
- Testes unitários para o middleware de erro verificando se `AppError` preserva o status code correcto.
- Teste de integração provocando intencionalmente um erro não tratado para assegurar retorno 500 sem queda do processo Node.js.

---

## Proposta 1: [Título da Próxima Proposta]
- **Data:**
- **Problema Identificado:**
- **Solução Proposta:**
- **Ficheiros e Módulos Afectados:**
- **Riscos e Mitigação:**
- **Plano de Testes:**
- **Feedback da Equipa:**
