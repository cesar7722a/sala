# Registos de Decisão Técnica (ADRs)

Utiliza este ficheiro para documentar decisões técnicas de engenharia tomadas durante o desenvolvimento no projecto da empresa. Documentar o "porquê" de uma escolha técnica demonstra maturidade profissional e visão de arquitectura.

---

## Estrutura Padrão de um Registo de Decisão (ADR)

- **Título:** ADR-[Número] - [Nome da Decisão]
- **Data:** AAAA-MM-DD
- **Estado:** Proposto / Aceite pela Equipa / Substituído / Rejeitado
- **Contexto:** Qual era a situação, limitação ou dilema técnico enfrentado?
- **Decisão Adoptada:** Que solução ou tecnologia foi escolhida e porquê?
- **Alternativas Consideradas:** Quais foram as outras opções avaliadas e porque foram descartadas?
- **Consequências Positivas:** Que benefícios imediatos e futuros foram alcançados?
- **Consequências Negativas / Trade-offs:** Que compromissos ou complexidades foram assumidos?

---

## Exemplo: ADR-001 - Centralização da Validação de Entrada com Zod
- **Data:** 2026-11-XX
- **Estado:** Aceite pela Equipa
- **Contexto:**
  As rotas da API realizavam validações pontuais e dispersas dentro dos próprios controladores com instruções `if (!req.body.name)`. Isso gerava duplicidade de código, inconsistência nas respostas de erro enviadas ao Frontend e ausência de inferência estrita de tipos no TypeScript.
- **Decisão Adoptada:**
  Adopção da biblioteca Zod com a criação de um middleware de validação genérico acoplado às rotas Express.
- **Alternativas Consideradas:**
  - *Joi:* Descartado por não oferecer inferência automática de tipos tão fluida para TypeScript como o Zod.
  - *Class-Validator:* Descartado porque a base de código actual não utiliza classes nem decoradores para DTOs.
- **Consequências Positivas:**
  Eliminação de código repetitivo nos controladores, tipagem garantida em tempo de compilação e respostas padronizadas com código 400.
- **Trade-offs:**
  Necessidade de adicionar a dependência do Zod ao `package.json` e curva ligeira de adaptação da equipa.

---

## ADR-002: [Título da Próxima Decisão]
- **Data:**
- **Estado:** Proposto
- **Contexto:**
- **Decisão Adoptada:**
- **Alternativas Consideradas:**
- **Consequências Positivas:**
- **Trade-offs:**
