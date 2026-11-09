# Semana 05: Bases de Dados Relacionais e ORM (PostgreSQL & Prisma)

## 1. Objectivos da Semana
- Compreender a modelação relacional avançada (chaves primárias, chaves estrangeiras, índices, integridade referencial).
- Dominar o fluxo de migrações determinísticas com Prisma ORM e PostgreSQL.
- Implementar operações CRUD completas com tipagem estrita gerada pelo Prisma Client.
- Configurar e consultar relacionamentos 1:1, 1:N e N:N de forma eficiente, prevenindo o problema de consulta N+1.
- Executar transacções atómicas (`$transaction`) para garantir a consistência dos dados em operações críticas.

## 2. Conteúdos Previstos
- [ ] Modelação relacional e normalização de dados.
- [ ] Anatomia do ficheiro `schema.prisma` (datasources, generators, models, enums).
- [ ] Gestão de migrações com a CLI: `prisma migrate dev` e `prisma db push`.
- [ ] Consultas complexas: filtros (`where`), selecção parcial (`select`), inclusão de relações (`include`).
- [ ] Transacções sequenciais e interactivas com Prisma Client.
- [ ] Boas práticas na gestão da pool de conexões com PostgreSQL.

## 3. Exercícios Práticos da Semana
Consulta o caderno de exercícios em: [`../../exercicios/semana-05.md`](file:///home/cesar-antonio/Documentos/projectos/nodejs-backend-roadmap/exercicios/semana-05.md)

## 4. Aplicação no Projecto da Empresa
- Analisar os esquemas de dados da base de dados da empresa e os modelos do ORM utilizado.
- Verificar como as migrações são executadas e se existem relacionamentos ou índices ausentes.
- Identificar fluxos críticos que exigem ou deveriam utilizar transacções atómicas.

## 5. Dúvidas e Conclusões
- Dúvida 1:
- Dúvida 2:
