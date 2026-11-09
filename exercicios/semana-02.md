# Exercícios — Semana 02: JavaScript Assíncrono no Backend

---

## Exercício 2.1: Desafio da Ordem do Event Loop (Básico)

### Enunciado
Analisa e implementa um script com diferentes temporizadores e fases assíncronas (`process.nextTick`, `Promise.resolve`, `setTimeout`, `setImmediate`, chamada síncrona). Antes de executar, deves prever no teu caderno a ordem exacta dos registos na consola e depois validar com a execução real.

### Objectivo
Compreender a diferença prática entre a fila de microtarefas (*Microtask Queue*) e as fases do Event Loop (*Timers* e *Check*).

### Conceitos Envolvidos
- `process.nextTick` vs `Promise.then` (Microtasks).
- `setTimeout(..., 0)` (Timers Phase) vs `setImmediate` (Check Phase).
- Bloco de execução síncrono.

### Requisitos
1. Criar `src/event-loop-quiz.ts` combinando as chamadas acima.
2. Comentar no topo do ficheiro a ordem prevista.
3. Executar com `npx tsx src/event-loop-quiz.ts` e justificar no relatório a razão de cada linha executada.

### Critérios de Avaliação
- [ ] Ordem prevista coincide com a ordem da especificação da libuv/Node.js.
- [ ] Justificação fundamentada da prioridade de `process.nextTick` sobre Promises e Timers.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução e o registo da saída aqui
```
**Observações e Aprendizados:**

---

## Exercício 2.2: Orquestrador de Chamadas com Tolerância a Falhas (Intermédio)

### Enunciado
Implementa um serviço que consulta simultaneamente 5 serviços simulados (funções assíncronas com atrasos e possíveis falhas aleatórias). O serviço deve processar todos os resultados sem interromper a execução caso algum falhe, gerando um resumo detalhado dos sucessos e dos erros.

### Objectivo
Dominar `Promise.allSettled` e evitar o comportamento de cancelamento rápido (*fail-fast*) de `Promise.all` em cenários de integração externa.

### Conceitos Envolvidos
- `Promise.allSettled` vs `Promise.all`.
- Tratamento granular de erros por item.
- Tipagem de estados `fulfilled` e `rejected`.

### Requisitos
1. Criar uma função `fetchServiceData(serviceId: number): Promise<ServiceResponse>` que simula atraso e rejeita se `serviceId === 3`.
2. Executar as 5 consultas em paralelo.
3. Agrupar a resposta final num objecto `{ successful: [...], failed: [...] }`.

### Critérios de Avaliação
- [ ] Nenhuma excepção não tratada (*UnhandledPromiseRejection*).
- [ ] Execução estritamente concorrente (tempo total próximo do serviço mais lento, e não a soma sequencial).
- [ ] Resposta final tipada com precisão.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**

---

## Exercício 2.3: Processamento de Grandes Volumes de Dados com Streams (Avançado)

### Enunciado
Cria um processador de ficheiros CSV volumosos (simulado com 100.000 linhas de registos). Utiliza Streams do Node.js (`stream.Readable`, `stream.Transform`, `node:stream/promises.pipeline`) para ler o ficheiro, converter campos específicos para caixa alta e gravar num ficheiro final, monitorizando o uso de memória RAM durante o processo.

### Objectivo
Processar dados contínuos sem carregar ficheiros pesados para a memória, dominando o controlo de fluxo (*Backpressure*).

### Conceitos Envolvidos
- `node:stream` (`Transform`, `pipeline`).
- `node:readline` ou transform stream customizada.
- `process.memoryUsage().heapUsed` para validação de pegada de memória.

### Requisitos
1. Gerar um ficheiro CSV de teste com dezenas de milhares de linhas.
2. Criar uma `Transform` Stream que converte o texto linha a linha.
3. Utilizar `pipeline` para conectar a leitura, transformação e escrita.
4. Demonstrar que a memória RAM alocada permanece estável durante toda a execução.

### Critérios de Avaliação
- [ ] O ficheiro completo nunca é carregado em memória com `fs.readFile`.
- [ ] Tratamento seguro de encerramento de ficheiros em caso de erro através de `pipeline`.
- [ ] Uso estável de memória comprovado via log.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**
