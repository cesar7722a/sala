# Mapeamento da Stack Tecnológica

Este documento estabelece a ponte técnica entre a **Stack de Aprendizagem** proposta no roadmap e a **Stack Real da Empresa**. O seu objectivo é assegurar que o tempo de estudo esteja focado nas tecnologias que agregam valor directo ao teu trabalho diário, sem dispersões nem introdução desnecessária de dependências.

---

## 1. Stack Proposta para a Formação

| Categoria | Tecnologia Adoptada | Justificação Técnica |
| :--- | :--- | :--- |
| **Runtime** | Node.js (LTS v20+) | Padrão da indústria para desenvolvimento Backend JavaScript/TypeScript não-bloqueante. |
| **Linguagem** | TypeScript (com JavaScript moderno) | Tipagem estática, inferência em tempo de compilação, maior manutenibilidade e contratos claros. |
| **Framework Web** | Express.js | Framework minimalista e universal, ideal para compreender os princípios do protocolo HTTP e middlewares. |
| **Base de Dados** | PostgreSQL | Base de dados relacional robusta, suporte a integridade referencial, ACID e JSONB. |
| **ORM / Query Builder**| Prisma ORM | Modelagem declarativa, tipagem ponta a ponta gerada automaticamente e migrações determinísticas. |
| **Validação de Schemas**| Zod | Validação em runtime com inferência nativa de tipos TypeScript (`z.infer`). |
| **Autenticação** | JWT (`jsonwebtoken`) | Padrão stateless para autenticação de APIs distribuídas e microsserviços. |
| **Password Hashing** | Argon2 ou bcrypt | Algoritmos criptográficos com funções de derivação de chave seguras contra ataques de força bruta. |
| **Testes Automatizados**| Vitest ou Jest | Testes unitários com mocks eficientes e execução veloz. |
| **Testes de API** | Supertest | Execução de requisições HTTP simuladas contra a aplicação Express sem necessidade de porta aberta. |
| **Cache em Memória** | Redis | Caching distribuído de baixa latência para mitigação de estrangulamentos na base de dados. |
| **Filas e Background** | BullMQ | Orquestração de tarefas assíncronas com Redis, retries automáticos e tolerância a falhas. |
| **Contentorização** | Docker & Docker Compose | Ambientes isolados, reprodutibilidade e imagens optimizadas multi-stage. |
| **Versionamento** | Git & GitHub | Padrão da indústria para controlo de versões, branches e Pull Requests. |
| **Documentação** | Swagger / OpenAPI 3.0 | Especificação aberta e documentação interactiva para consumo de APIs por equipas de Frontend. |

---

## 2. Stack Real da Empresa (A Preencher/Actualizar)

> [!NOTE]
> Esta secção será preenchida e afinada à medida que explorares ou partilhares as tecnologias e dependências do repositório da empresa. **Não inventamos ferramentas que a equipa não utiliza.**

| Categoria | Tecnologia em Produção | Notas de Integração com o Plano |
| :--- | :--- | :--- |
| **Runtime / Versão** | *A confirmar (ex.: Node.js 18 / 20)* | Alinhar a versão do Node local com a versão do servidor da empresa. |
| **Linguagem** | *A confirmar (TypeScript / JS)* | Se for TypeScript, verificar se usam `strict: true` no `tsconfig.json`. |
| **Framework Web** | *A confirmar (Express / NestJS / Fastify)* | Se usarem NestJS ou Fastify, adaptaremos os conceitos de rotas e middlewares. |
| **Base de Dados** | *A confirmar (PostgreSQL / MySQL / etc.)* | Validar se o motor relacional coincide. |
| **ORM / Data Access** | *A confirmar (Prisma / TypeORM / Knex / etc.)*| Priorizar o ORM em uso para os exercícios avançados de persistência. |
| **Validação** | *A confirmar (Zod / Joi / Yup / Class-Validator)*| Mapear a biblioteca existente para não criar padrões divergentes. |
| **Autenticação** | *A confirmar (JWT / Sessions / Auth0)* | Compreender como as requisições autenticadas são validadas actualmente. |
| **Testes** | *A confirmar (Jest / Mocha / Vitest)* | Escrever testes respeitando o test runner já configurado no projecto. |
| **DevOps / Infra** | *A confirmar (Docker / Compose / Cloud)* | Verificar como a equipa corre a aplicação localmente. |

---

## 3. Matriz de Decisão: O que Introduzir vs. O que Dispensar

Para manter o foco e respeitar o teu tempo (1h30/dia):

1. **Adoptar de Imediato:**
   - Fundamentos do Event Loop, manipulação assíncrona, boas práticas de HTTP, princípios SOLID e testes automatizados. Estes conceitos aplicam-se a qualquer stack Node.js.
2. **Harmonizar com a Empresa:**
   - Se o projecto da empresa já utiliza **TypeORM** em vez de **Prisma**, o estudo da Fase 3 será orientado a TypeORM.
   - Se a empresa utiliza **Class-Validator** com **NestJS**, adaptaremos o estudo de validação para respeitar essa arquitectura.
3. **Tecnologias que Não Precisam de Ser Introduzidas:**
   - Não introduzir bibliotecas pesadas de terceiros (ex.: lodash, moment.js, frameworks alternativas) sem necessidade fundamentada.
   - Não forçar a introdução de Redis ou filas (BullMQ) no projecto da empresa se a arquitectura actual não necessitar dessa complexidade.
