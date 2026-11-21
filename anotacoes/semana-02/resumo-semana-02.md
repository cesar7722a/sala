# Resumo Semanal: Semana 02 — JavaScript Assíncrono, Event Loop e Streams

- **Período:** De 2026-11-16 (Segunda-feira) a 2026-11-21 (Sábado)
- **Fase:** Fase 1 — Fundamentos de Node.js
- **Horas Previstas:** 9h (6 sessões de 1h30)
- **Horas Realizadas:** 9h00 (100% cumpridas | 18h00 acumuladas no total)

---

## 1. Objectivos Principais da Semana
- [x] Dominar a ordem de execução do Event Loop, Microtask Queue vs Macrotask Phases.
- [x] Concorrência e tolerância a falhas com `Promise.all` vs `Promise.allSettled`.
- [x] Compreender a manipulação de bytes com a classe `Buffer` e evitar estouro de Heap.
- [x] Processamento de grandes volumes de dados através de Streams e controlo de *Backpressure*.
- [x] Implementar o padrão Result (`safeAsync`) para tratamento limpo de erros assíncronos.
- [x] Mapear e desenhar a arquitectura de ingestão assíncrona da plataforma de vídeo-aulas da empresa (ADR-001).

---

## 2. Planeamento Diário Realizado

- **Segunda-feira (Conceitos — Aula 06):** Event Loop na prática, Microtasks (`process.nextTick`, Promises) vs Macrotasks (`setTimeout`, `setImmediate`), resolução do Exercício 2.1 (Event Loop Quiz).
- **Terça-feira (Exercícios — Aula 07):** Resolução do Exercício 2.2 (`src/orchestrator.ts` com `Promise.allSettled` em 153ms) e Exercício 2.3 (`src/stream-processor.ts` processando 50.000 registos em 93ms mantendo RAM em ~11MB).
- **Quarta-feira (Aprofundamento — Aula 08):** Ciclo de vida de streams (`drain`, `finish`, `close`, `error`), revisão da propagação de erros em `async/await` e construção do módulo utilitário `src/safe-async.ts`.
- **Quinta-feira (Implementação — Aula 09):** Ingestão de vídeos com validação por *Magic Bytes* (`Buffer` e assinatura `ftyp`) e cálculo de checksum SHA-256 via stream em `src/video-ingestion.ts`.
- **Sexta-feira (Aplicação na Empresa — Aula 10):** Formalização da **ADR-001: Ingestão de Vídeos por Streams e Processamento Assíncrono com Filas (BullMQ/Redis)** e criação de `src/course-video-service.ts` com resposta imediata `HTTP 202 Accepted` em 138ms.
- **Sábado (Desafio e Revisão — Aula 11):** Desafio integrador em `src/index.ts`, consolidação teórica e encerramento formal da Fase 1.
- **Domingo:** Descanso activo e recuperação mental.

---

## 3. Principais Descobertas Técnicas
1. **Nunca usar `fs.readFile` em uploads de vídeo:** O carregamento síncrono ou total em memória esgota a V8 Heap (`heap out of memory`). Streams com `pipeline` mantêm a memória lisa e previsível.
2. **Extensões de ficheiro mentem:** Qualquer executável malicioso pode ser nomeado `.mp4`. A verificação por *Magic Bytes* nos primeiros bytes do `Buffer` é mandatória.
3. **Desacoplamento por Filas:** A API HTTP do Express não deve esperar por transcodificações demoradas. A resposta deve ser imediata (`HTTP 202`) e o trabalho delegado a um Worker em background via Redis/BullMQ.
4. **Padrão Result (`safeAsync`):** Elimina o festival de `try/catch` aninhados e traz clareza e previsibilidade ao TypeScript.

---

## 4. Dificuldades Encontradas e Soluções
- **Dificuldade:** "Salto no vazio" na sintaxe prática de criação de streams (saber criar do zero vs apenas teoria).
- **Como ultrapassaste:** Ajuste da metodologia pedagógica, adoptando formalmente em todas as aulas a secção **"Como Criar do Zero (Anatomia e Esqueleto Passo a Passo)"**, com imports discriminados e código base mastigado.

---

## 5. Avaliação do Cumprimento dos Critérios de Conclusão
- [x] Conteúdos previstos no cronograma para a Semana 02 foram 100% cobertos.
- [x] Exercícios 2.1, 2.2 e 2.3 concluídos e validados com código funcional.
- [x] Aplicação corporativa realizada com ADR-001 e simulação da plataforma de cursos.
- [x] Compilação do TypeScript estrito (`strict: true`) aprovada com 0 erros.
- [x] Ficheiro `progresso.md` actualizado com 18h / 108h.
