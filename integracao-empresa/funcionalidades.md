# Registo de Funcionalidades Desenvolvidas na Empresa

Regista aqui cada funcionalidade ou correcção implementada na base de código corporativa. Utiliza a estrutura do template para medir a tua evolução técnica.

---

## Exemplo de Registo (Modelo de Referência)

### Funcionalidade: Paginação Defensiva na Listagem de Recursos
- **Data de Conclusão:** 2026-11-XX
- **Semana do Roadmap:** Semana 06 (Validação e Tratamento de Erros)
- **Problema que Pretende Resolver:**
  O endpoint de listagem trazia todos os registos da base de dados de uma só vez. À medida que o volume de dados cresceu, a requisição começou a apresentar alta latência e elevado consumo de memória no servidor Node.js.
- **Conceitos Técnicos Utilizados:**
  - Paginação baseada em *offset/limit* no ORM.
  - Validação e cast de strings numéricas com Zod.
  - Sanitização de parâmetros de consulta com limite máximo de 50 itens por página.
- **Ficheiros/Módulos Envolvidos:**
  - `src/modules/.../controllers/list-resources.controller.ts`
  - `src/modules/.../services/list-resources.service.ts`
  - `src/modules/.../repositories/...`
- **Implementação Realizada:**
  Criou-se um schema de validação para a query string forçando valores padrão (`page=1`, `limit=20`, `maxLimit=50`). O Service passou a receber os limites validados e o repositório utilizou as instruções `skip` e `take` do ORM, devolvendo os dados acompanhados de metadados de paginação.
- **Testes Executados:**
  - Testes unitários do Service validando o cálculo de `skip`.
  - Testes manuais via cliente HTTP testando limites extremos (`limit=10000`, `page=-5`).
- **Resultado Obtido:**
  Tempo médio de resposta reduzido em mais de 70% e payload previsível para a equipa de Frontend.
- **Dificuldades Encontradas:**
  Converter os query parameters do Express (que chegam sempre como strings) para inteiros válidos sem quebrar requisições sem parâmetros informados.
- **O que Aprendi:**
  A importância de nunca confiar nos parâmetros enviados pelo cliente e como a paginação protege a estabilidade de toda a infraestrutura.

---

## Registo 1: [Nome da Primeira Funcionalidade]
- **Data de Conclusão:**
- **Semana do Roadmap:**
- **Problema que Pretende Resolver:**
- **Conceitos Técnicos Utilizados:**
- **Ficheiros/Módulos Envolvidos:**
- **Implementação Realizada:**
- **Testes Executados:**
- **Resultado Obtido:**
- **Dificuldades Encontradas:**
- **O que Aprendi:**

---

## Registo 2: [Nome da Segunda Funcionalidade]
- **Data de Conclusão:**
- **Semana do Roadmap:**
- **Problema que Pretende Resolver:**
- **Conceitos Técnicos Utilizados:**
- **Ficheiros/Módulos Envolvidos:**
- **Implementação Realizada:**
- **Testes Executados:**
- **Resultado Obtido:**
- **Dificuldades Encontradas:**
- **O que Aprendi:**
