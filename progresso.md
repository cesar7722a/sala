# Painel de Controlo de Progresso e Evolução

Este ficheiro serve como o teu diário de bordo e painel de controlo técnico. Deves actualizá-lo ao final de cada sessão de estudo ou ao concluir cada semana.

---

## 1. Visão Geral do Progresso

- **Estado Actual:** 🔄 Semana 03 em Curso (Fase 2: APIs e Arquitectura) — Protocolo HTTP, REST, Express.js e Organização Modular de Rotas
- **Horas Acumuladas:** 25.5 / 108 horas previstas (25h30 concluídas: 18h00 Fase 1 + 7h30 Semana 03)
- **Semanas Concluídas:** 2 / 12 semanas (Fase 1 100% concluída)
- **Exercícios Concluídos:** 9 formais + Tarefas 01 a 04 da Aula 15/16 resolvidas com arquitectura modular (Controllers e Routers separados)
- **Funcionalidades Aplicadas na Empresa:** Plataforma de Vídeo-Aulas (Arquitectura modular com `express.Router()`, separação estrita de Controllers para Cursos, Aulas, Categorias, Estudantes e Instrutores, catálogo com filtros e tratamento de erros)

**Conteúdos abordados na preparação da Aula 15:**

- Organização modular de rotas com `express.Router()`.
- Separação de responsabilidades entre Routes e Controllers.
- Integração de routers na aplicação principal através de `app.use()`.
- Combinação de prefixos e caminhos internos.
- Middlewares globais, de Router e específicos de rotas.
- Importância da ordem de declaração das rotas, especialmente entre caminhos específicos e dinâmicos.

---

## 2. Tabela de Acompanhamento das 12 Semanas

| Semana | Tema Principal                                     | Horas Dedicadas |     Estado     |                                                                                                             Avaliação / Nota                                                                                                              | Data de Conclusão |
| :----: | :------------------------------------------------- | :-------------: | :------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ----------------- |
| **01** | Node.js, V8, libuv e Ambiente TypeScript           |     9 / 9h      |  ✅ Concluído  |                                                 Exercícios 1.1 a 1.3 e pipeline de build/start concluídos e a criação do repo hospital_api e as configurações aprendido durante a semana                                                  | Data 2026-11-14   |
| **02** | JavaScript Assíncrono, Event Loop e Streams        |     9 / 9h      |  ✅ Concluído  |                                                              Exercícios 2.1 a 2.3, `safeAsync`, ADR-001, Ingestão de Vídeo e Bootstrap Integrador concluídos com distinção.                                                               | Data 2026-11-21   |
| **03** | Protocolo HTTP, REST e Express.js                  |    7h30 / 9h    |  🔄 Em Curso   | Exercícios 3.1, 3.2 e 3.3 concluídos. Aulas 15 e 16 consolidadas: domínio prático de `express.Router()`, separação integral de Routes e Controllers (Cursos, Aulas, Categorias, Alunos, Instrutores) e montagem de múltiplos módulos. | -                 |
| **04** | Arquitectura Controller-Service-Repository & SOLID |     0 / 9h      | ⏳ Por Iniciar |                                                                                                                     -                                                                                                                     | -                 |
| **05** | PostgreSQL, Modelação e Prisma ORM                 |     0 / 9h      | ⏳ Por Iniciar |                                                                                                                     -                                                                                                                     | -                 |
| **06** | Validação com Zod e Tratamento Global de Erros     |     0 / 9h      | ⏳ Por Iniciar |                                                                                                                     -                                                                                                                     | -                 |
| **07** | Autenticação com JWT e Hashing Criptográfico       |     0 / 9h      | ⏳ Por Iniciar |                                                                                                                     -                                                                                                                     | -                 |
| **08** | Autorização RBAC e OWASP API Security              |     0 / 9h      | ⏳ Por Iniciar |                                                                                                                     -                                                                                                                     | -                 |
| **09** | Testes Automatizados com Vitest/Jest e Supertest   |     0 / 9h      | ⏳ Por Iniciar |                                                                                                                     -                                                                                                                     | -                 |
| **10** | Performance, Caching com Redis e Filas com BullMQ  |     0 / 9h      | ⏳ Por Iniciar |                                                                                                                     -                                                                                                                     | -                 |
| **11** | Contentorização Docker Multi-Stage e Produção      |     0 / 9h      | ⏳ Por Iniciar |                                                                                                                     -                                                                                                                     | -                 |
| **12** | Documentação OpenAPI/Swagger e Entrega Final       |     0 / 9h      | ⏳ Por Iniciar |                                                                                                                     -                                                                                                                     | -                 |

_Legenda de Estado: ⏳ Por Iniciar | 🔄 Em Curso | ✅ Concluído_

---

## 3. Registo de Exercícios Concluídos

|    Data    |  Semana   | Exercício / Desafio                               |    Status    | Observações / Feedback                                                                                               |
| :--------: | :-------: | :------------------------------------------------ | :----------: | :------------------------------------------------------------------------------------------------------------------- |
| 2026-11-09 | Semana 01 | Exercício 1.1: Diagnóstico de Ambiente            | ✅ Concluído | Resolução de módulos com `NodeNext`, `types: ["node"]` e `node:os`/`node:process`.                                   |
| 2026-11-10 | Semana 01 | Exercício 1.2: Gerenciador de Configuração        | ✅ Concluído | Implementação do padrão Fail-Fast com `process.exit(1)`, tipagem `AppConfig` e `.env.example`.                       |
| 2026-11-11 | Semana 01 | Exercício 1.3: Analisador Assíncrono de Ficheiros | ✅ Concluído | Processamento não-bloqueante com `fs/promises`, caminhos com `node:path` e `.vscode/launch.json`.                    |
| 2026-11-16 | Semana 02 | Exercício 2.1: JavaScript Assíncrono              | ✅ Concluído | Sequência de execução `SetTimers, promises, async/await`.                                                            |
| 2026-11-17 | Semana 02 | Exercício 2.2: Orquestrador com Tolerância        | ✅ Concluído | Concorrência paralela com `Promise.allSettled`, tipagem discriminada e tolerância a falhas.                          |
| 2026-11-17 | Semana 02 | Exercício 2.3: Processamento com Streams          | ✅ Concluído | Processamento contínuo de 50.000 linhas com `createReadStream`, `Transform` e `pipeline`. RAM: ~11MB.                |
| 2026-11-23 | Semana 03 | Exercício 3.1: CRUD Básico com Express e TS       | ✅ Concluído | Roteamento RESTful, `express.json()`, status 200, 201 Created, 204 No Content e 404 Not Found.                       |
| 2026-11-24 | Semana 03 | Exercício 3.2: Middleware de Auditoria & Tempo    | ✅ Concluído | `process.hrtime.bigint()`, interceptação de `res.send`, cabeçalho `X-Response-Time` e evento `res.finish`.           |
| 2026-11-25 | Semana 03 | Exercício 3.3: Filtros & Paginação Defensiva      | ✅ Concluído | Query strings (`req.query`), limites com `Math.min/max`, busca textual e middleware global de erros de 4 argumentos. |

---

## 4. Funcionalidades Entregues na Plataforma de Vídeo-Aulas

|    Data    | Funcionalidade / Módulo                            | Conceito Aplicado                                        |    Estado    | Impacto Técnico                                                                               |
| :--------: | :------------------------------------------------- | :------------------------------------------------------- | :----------: | :-------------------------------------------------------------------------------------------- |
| 2026-11-20 | Ingestão e Validação Criptográfica de Vídeos       | Magic Bytes com Buffer, SHA-256 via Stream e `safeAsync` | ✅ Concluído | Bloqueia ficheiros maliciosos e calcula integridade mantendo RAM fixa (< 15 MB).              |
| 2026-11-20 | ADR-001: Processamento Assíncrono com BullMQ/Redis | Arquitectura de desacoplamento com `HTTP 202 Accepted`   | ✅ Aprovado  | Elimina risco de timeout HTTP e separa transcodificação de vídeos da API síncrona do Express. |

---

## 5. Dificuldades Encontradas e Soluções Adoptadas

|  Semana   | Desafio / Dificuldade                                                | Causa Raiz                                                                                        | Como Foi Resolvido                                                           |
| :-------: | :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------- |
| Semana 01 | TypeScript não encontrava tipos para `node:os` e `node:process`      | O compilador necessita de mapeamento explícito de tipos do runtime no `tsconfig.json`             | Adicionado `"types": ["node"]` nas `compilerOptions`                         |
| Semana 01 | Uso de `catch (error: any)` no Exercício 1.3 viola a tipagem estrita | Uso de `any` para acessar `error.code` no tratamento de `ENOENT`                                  | Adicionado refactorizar para `catch (error: unknown)` com type guard         |
| Semana 03 | Rotas específicas podem ser capturadas por rotas dinâmicas           | A ordem de declaração das rotas pode fazer com que `/:id` corresponda a caminhos como `/featured` | Declarar primeiro as rotas específicas e depois as rotas dinâmicas genéricas |
| Semana 03 | Concentração de rotas e lógica no ficheiro principal                 | O crescimento da aplicação aumenta a quantidade de responsabilidades concentradas no `server.ts`  | Introduzir `express.Router()` e separar Routes de Controllers                |

---

## 6. Próximo Objectivo Imediato

- [x] **Concluir a Semana 01:** V8, libuv, CommonJS vs ESM, Fail-Fast, pipeline de build e scripts corporativos.
- [x] **Concluir a Semana 02:** Event Loop, Promises, `Promise.allSettled`, Streams, Buffers, Magic Bytes e ADR-001.
- [x] **Concluir a Fase 1 (Fundamentos de Node.js):** 18h00 / 108h cumpridas com 100% de aproveitamento.
- [x] **Iniciar a Fase 2 (Semana 03 — Segunda-feira):** Protocolo HTTP, REST e Express.js — Arquitectura cliente-servidor, métodos HTTP, status codes, routing, middlewares e primeiros endpoints REST da plataforma de vídeo-aulas.
- [ ] **Consolidar a Aula 15:** Praticar a modularização de rotas com `express.Router()`, separar Routes e Controllers, testar a integração de vários routers e dominar a ordem de declaração das rotas.
- [ ] **Concluir a Semana 03:** Completar as 9 horas previstas, consolidar a arquitectura Express e preparar a transição para a Semana 04 — Controller-Service-Repository e SOLID.
