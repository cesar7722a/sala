# Painel de Controlo de Progresso e Evolução

Este ficheiro serve como o teu diário de bordo e painel de controlo técnico. Deves actualizá-lo ao final de cada sessão de estudo ou ao concluir cada semana.

---

## 1. Visão Geral do Progresso

- **Estado Actual:** 🔄 Semana 02 em Curso (Fase 1: Fundamentos) — JavaScript Assíncrono no Backend
- **Horas Acumuladas:** 18.0 / 108 horas previstas (18h00 concluídas: 9h00 Semana 01 + 9h00 Semana 02)
- **Semanas Concluídas:** 1 / 12 semanas (Semana 02 a 100% dos blocos práticos, aguardando consolidação de sábado)
- **Exercícios e Módulos Concluídos:** 6 exercícios formais + `safeAsync` + Pipeline de Ingestão de Vídeo + Serviço Desacoplado HTTP 202 (`course-video-service.ts`)
- **Funcionalidades Aplicadas na Empresa:** Plataforma de Vídeo-Aulas (ADR-001, Ingestão por Streams e Desacoplamento Assíncrono concluídos)

---

## 2. Tabela de Acompanhamento das 12 Semanas

| Semana | Tema Principal                           | Horas Dedicadas |    Estado    |                                                             Avaliação / Nota                                                             | Data de Conclusão |
| :----: | :--------------------------------------- | :-------------: | :----------: | :--------------------------------------------------------------------------------------------------------------------------------------: | ----------------- |
| **01** | Node.js, V8, libuv e Ambiente TypeScript |     9 / 9h      | ✅ Concluído | Exercícios 1.1 a 1.3 e pipeline de build/start concluídos e a criação do repo hospital_api e as configurações aprendido durante a semana | Data 2026-11-14   |
| **02** | JavaScript Assíncrono, Event Loop e Streams | 9 / 9h | 🔄 Em Curso | Exercícios 2.1 a 2.3, `safeAsync`, ADR-001 e serviço desacoplado com resposta imediata HTTP 202 concluídos. | - |

| **03** | Protocolo HTTP, REST e Express.js | 0 / 9h | ⏳ Por Iniciar | - | - |
| **04** | Arquitectura Controller-Service-Repository & SOLID | 0 / 9h | ⏳ Por Iniciar | - | - |
| **05** | PostgreSQL, Modelação e Prisma ORM | 0 / 9h | ⏳ Por Iniciar | - | - |
| **06** | Validação com Zod e Tratamento Global de Erros | 0 / 9h | ⏳ Por Iniciar | - | - |
| **07** | Autenticação com JWT e Hashing Criptográfico | 0 / 9h | ⏳ Por Iniciar | - | - |
| **08** | Autorização RBAC e OWASP API Security | 0 / 9h | ⏳ Por Iniciar | - | - |
| **09** | Testes Automatizados com Vitest/Jest e Supertest | 0 / 9h | ⏳ Por Iniciar | - | - |
| **10** | Performance, Caching com Redis e Filas com BullMQ | 0 / 9h | ⏳ Por Iniciar | - | - |
| **11** | Contentorização Docker Multi-Stage e Produção | 0 / 9h | ⏳ Por Iniciar | - | - |
| **12** | Documentação OpenAPI/Swagger e Entrega Final | 0 / 9h | ⏳ Por Iniciar | - | - |

_Legenda de Estado: ⏳ Por Iniciar | 🔄 Em Curso | ✅ Concluído_

---

## 3. Registo de Exercícios Concluídos

|           Data           |  Semana   | Exercício / Desafio                               |    Status    | Observações / Feedback                                                                         |
| :----------------------: | :-------: | :------------------------------------------------ | :----------: | :--------------------------------------------------------------------------------------------- |
|        2026-11-09        | Semana 01 | Exercício 1.1: Diagnóstico de Ambiente            | ✅ Concluído | Resolução de módulos com `NodeNext`, `types: ["node"]` e `node:os`/`node:process`.             |
|        2026-11-10        | Semana 01 | Exercício 1.2: Gerenciador de Configuração        | ✅ Concluído | Implementação do padrão Fail-Fast com `process.exit(1)`, tipagem `AppConfig` e `.env.example`. |
|        2026-11-11        | Semana 01 | Exercício 1.3: Analisador Assíncrono de Ficheiros | ✅ Concluído | Processamento não-bloqueante com `fs/promises`, caminhos com `node:path`                       |
| e `.vscode/launch.json`. |
|        2026-11-16        | Semana 02 | Exercício 2.1: JavaScript Assíncrono              | ✅ Concluído | sequencia de executação `SetTimers, promises, async/await`                                     |
|        2026-11-17        | Semana 02 | Exercício 2.2: Orquestrador com Tolerância        | ✅ Concluído | Concorrência paralela com `Promise.allSettled`, tipagem discriminada e tolerância a falhas.     |
|        2026-11-17        | Semana 02 | Exercício 2.3: Processamento com Streams          | ✅ Concluído | Processamento contínuo de 50.000 linhas com `createReadStream`, `Transform` e `pipeline`. RAM: ~11MB. |

---

## 4. Funcionalidades Entregues na Plataforma de Vídeo-Aulas

|    Data    | Funcionalidade / Módulo                           | Conceito Aplicado                                   |    Estado    | Impacto Técnico                                                                                |
| :--------: | :------------------------------------------------ | :-------------------------------------------------- | :----------: | :--------------------------------------------------------------------------------------------- |
| 2026-11-20 | Ingestão e Validação Criptográfica de Vídeos      | Magic Bytes com Buffer, SHA-256 via Stream e `safeAsync` | ✅ Concluído | Bloqueia ficheiros maliciosos e calcula integridade mantendo RAM fixa (< 15 MB).               |
| 2026-11-20 | ADR-001: Processamento Assíncrono com BullMQ/Redis| Arquitectura de desacoplamento com `HTTP 202 Accepted` | ✅ Aprovado  | Elimina risco de timeout HTTP e separa transcodificação de vídeos da API síncrona do Express. |

---

## 5. Dificuldades Encontradas e Soluções Adoptadas

|  Semana   | Desafio / Dificuldade                                                | Causa Raiz                                                                            | Como Foi Resolvido                                                   |
| :-------: | :------------------------------------------------------------------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------- |
| Semana 01 | TypeScript não encontrava tipos para `node:os` e `node:process`      | O compilador necessita de mapeamento explícito de tipos do runtime no `tsconfig.json` | Adicionado `"types": ["node"]` nas `compilerOptions`                 |
| Semana 01 | Uso de `catch (error: any)` no Exercício 1.3 viola a tipagem estrita | Uso de `any` para acessar `error.code` no tratamento de `ENOENT`                      | Adicionado refactorizar para `catch (error: unknown)` com type guard |

---

## 6. Próximo Objectivo Imediato

- [x] **Concluir a Semana 01 (sessão de sábado):** executar o Desafio Individual (`hospital_api`) — criar a fundação do repositório `hospital_api` (ESM, `tsconfig` estrito, scripts `dev/build/start`, `.env.example`, `.gitignore`, README com decisões técnicas). Ao concluir, atualizar horas para 9.0/9h, estado para ✅ e Data de Conclusão para 2026-11-14.
- [x] Corrigir o `catch (error: any)` → `unknown` + type guard no Exercício 1.3.
- [ ] Iniciar a Semana 02: Event Loop na prática, Promises/async-await, Streams e Buffer — primeira fatia do `hospital_api`: importador CSV de doentes em streaming.
