# Aula 06: Event Loop na Prática, Promises e `async/await`

- **Data:** 2026-11-16 (Segunda-feira)
- **Semana:** Semana 02
- **Duração da Sessão:** 90 minutos (15 min revisão | 25 min teoria | 40 min código | 10 min registo)

---

## 1. Tema

Como o Event Loop executa código assíncrono na prática: a ordem entre código síncrono, microtarefas (`process.nextTick`, Promises) e macrotarefas (`setTimeout`, `setImmediate`). Introdução sólida a Promises e `async/await`, com as armadilhas mais comuns no backend.

## 2. Objectivos de Aprendizagem

- [ ] Prever a ordem de execução de código que mistura síncrono, `process.nextTick`, Promises, `setTimeout` e `setImmediate`.
- [ ] Explicar a diferença entre Microtask Queue e as fases Timers/Check do Event Loop.
- [ ] Usar `async/await` corretamente, incluindo `try/catch` e o problema do `await` dentro de `forEach`.
- [ ] Reconhecer quando uma operação é concorrente (`Promise.all`) e quando é sequencial (loop com `await`).

## 3. Pré-requisitos

- Semana 01 concluída: ESM, `tsconfig` estrito, `fs/promises`, `process.exit` vs `throw`.
- Repositório `hospital_api` criado (com `src/index.ts` a arrancar).

## 4. Explicação dos Conceitos

**O Event Loop, em uma frase:** o Node.js corre JavaScript numa única thread; quando uma operação é assíncrona (I/O, timer), o trabalho é delegado à libuv e o resultado é colocado numa fila. O Event Loop vai buscar esses resultados por fases, e entre fases esvazia as **microtarefas**.

**As duas filas que importam hoje:**

- **Microtask Queue** (`process.nextTick` e callbacks de Promises): esvaziada **entre cada fase** e **antes de qualquer macrotarefa**. `process.nextTick` tem prioridade sobre Promises.
- **Macrotarefas** (`setTimeout`, `setImmediate`, I/O): executadas nas fases do Event Loop. `setTimeout(0)` cai na fase **Timers**; `setImmediate` cai na fase **Check** (depois de I/O).

**Regra prática para prever a ordem:**

1. Todo o código síncrono corre primeiro.
2. Depois, todas as microtarefas (primeiro `nextTick`, depois Promises).
3. Depois, as macrotarefas por fase (`setTimeout` antes de `setImmediate` — **na maioria dos casos**; a ordem exata entre eles pode variar se o código não estiver dentro de um ciclo de I/O).

**Promises e `async/await`:**

- Uma Promise tem três estados: `pending`, `fulfilled`, `rejected`. É **imutável** depois de resolvida.
- `async` transforma o retorno numa Promise; `await` **pausa a função** (não a thread) até a Promise resolver.
- `try/catch` apanha rejeições de `await` — mas **não** apanha rejeições de Promises que não foram awaited.
- **Armadilha clássica:** `array.forEach(async (x) => { await f(x); })` **não espera** — o `forEach` ignora a Promise devolvida. Para processar em sequência, usar `for...of` com `await`; para concorrente, `Promise.all(array.map(...))`.

## 5. Exemplos de Código

**Prever a ordem (Exercício 2.1):**

```typescript
import process from "node:process";

console.log("1 — síncrono");

setTimeout(() => console.log("2 — setTimeout"), 0);

setImmediate(() => console.log("3 — setImmediate"));

Promise.resolve().then(() => console.log("4 — Promise.then"));

process.nextTick(() => console.log("5 — process.nextTick"));

console.log("6 — fim do síncrono");
```
