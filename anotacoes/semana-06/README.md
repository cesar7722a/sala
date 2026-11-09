# Semana 06: Validação de Dados e Tratamento Consistente de Erros

## 1. Objectivos da Semana
- Compreender a criticidade da validação em runtime nas fronteiras da API Backend.
- Dominar a biblioteca Zod para modelação declarativa de contratos de dados (body, query, params).
- Integrar a inferência de tipos do TypeScript com esquemas de validação do Zod (`z.infer`).
- Construir middlewares reutilizáveis para intercepção e sanitização automática de entradas.
- Implementar paginação defensiva, ordenação controlada e filtragem de resultados.
- Padronizar as respostas de erro da API seguindo normas reconhecidas (ex.: RFC 7807).

## 2. Conteúdos Previstos
- [ ] Schemas primitivos, compostos, opcionais e transformações com Zod.
- [ ] Refinamentos customizados (`.refine()`) para validações de regras complexas.
- [ ] Criação de middleware de validação para Express.
- [ ] Formatação amigável e consistente de erros de validação (400 Bad Request).
- [ ] Paginação baseada em página/limite vs paginação baseada em cursor.
- [ ] Sanitização contra manipulação indevida de dados.

## 3. Exercícios Práticos da Semana
Consulta o caderno de exercícios em: [`../../exercicios/semana-06.md`](file:///home/cesar-antonio/Documentos/projectos/nodejs-backend-roadmap/exercicios/semana-06.md)

## 4. Aplicação no Projecto da Empresa
- Identificar como a validação de parâmetros e payloads é realizada nos endpoints existentes da empresa.
- Avaliar se existem rotas vulneráveis à recepção de tipos inválidos ou dados inexistentes.
- Propor ou implementar schemas de validação mais rigorosos num endpoint prioritário.

## 5. Dúvidas e Conclusões
- Dúvida 1:
- Dúvida 2:
