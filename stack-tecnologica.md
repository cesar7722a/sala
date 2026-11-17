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

## 2. Stack Real da Empresa (Confirmada para a Plataforma de Vídeo-Aulas)

> [!IMPORTANT]
> **Projecto:** Plataforma de Vídeo-Aulas com gestão de conteúdos de produtores e acesso pago para alunos.
> **Responsabilidade:** Responsável integral por toda a configuração da arquitectura backend desde o zero.
> **Alinhamento:** Toda a stack do roadmap foi validada e será aplicada no projecto corporativo.

| Categoria | Tecnologia Adoptada | Papel na Plataforma de Vídeo-Aulas |
| :--- | :--- | :--- |
| **Runtime** | Node.js (LTS v24 / v20+) | Backend não bloqueante com I/O assíncrono para streaming e APIs. |
| **Linguagem** | TypeScript (`strict: true`) | Contratos fortes para entidades de pagamentos, cursos, aulas e utilizadores. |
| **Framework Web** | Express.js | Roteamento RESTful para catálogo de cursos, aulas, inscrições e webhooks. |
| **Base de Dados** | PostgreSQL | Persistência relacional para transacções ACID de compras, utilizadores e permissões. |
| **ORM** | Prisma ORM | Modelação declarativa e migrações tipadas ponta a ponta. |
| **Validação** | Zod | Validação rigorosa de payloads de registo, compras e metadados de vídeo. |
| **Autenticação** | JWT + Argon2 | Controlo de acesso stateless e hashing ultra-seguro de senhas. |
| **Armazenamento de Vídeo** | Object Storage (S3 / R2 / MinIO) | Armazenamento de ficheiros de vídeo pesados com streaming assíncrono. |
| **Processamento Assíncrono**| BullMQ + Redis | Transcodificação e processamento de vídeos fora do ciclo da requisição HTTP. |
| **Cache em Memória** | Redis | Caching de catálogo de cursos e controlo de sessões/taxa de requisições. |
| **Testes** | Vitest + Supertest | Testes automatizados das regras de negócio de pagamentos e autorização. |
| **Infraestrutura** | Docker & Docker Compose | Contentorização completa da API, PostgreSQL e Redis para desenvolvimento e produção. |
| **Documentação** | Swagger / OpenAPI 3.0 | Contrato interactivo para consumo pela equipa de Frontend (React/Next.js). |

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
