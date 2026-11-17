# Exercícios — Semana 02: JavaScript Assíncrono no Backend

---

## Exercício 2.1: Desafio da Ordem do Event Loop (Básico)

### Enunciado

Analisa e implementa um script com diferentes temporizadores e fases assíncronas (`process.nextTick`, `Promise.resolve`, `setTimeout`, `setImmediate`, chamada síncrona). Antes de executar, deves prever no teu caderno a ordem exacta dos registos na consola e depois validar com a execução real.

### Objectivo

Compreender a diferença prática entre a fila de microtarefas (_Microtask Queue_) e as fases do Event Loop (_Timers_ e _Check_).

### Conceitos Envolvidos

- `process.nextTick` vs `Promise.then` (Microtasks).
- `setTimeout(..., 0)` (Timers Phase) vs `setImmediate` (Check Phase).
- Bloco de execução síncrono.

### Requisitos

1. Criar `src/event-loop-quiz.ts` combinando as chamadas acima.
2. Comentar no topo do ficheiro a ordem prevista.
3. Executar com `npx tsx src/event-loop-quiz.ts` e justificar no relatório a razão de cada linha executada.

### Critérios de Avaliação

- [x] Ordem prevista coincide com a ordem da especificação da libuv/Node.js.
- [x] Justificação fundamentada da prioridade de `process.nextTick` sobre Promises e Timers.

### Espaço para Solução e Observações

```typescript
console.log("A");

setTimeout(() => {
  console.log("B");

  process.nextTick(() => {
    console.log("C");
  });

  Promise.resolve().then(() => {
    console.log("D");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("E");

  process.nextTick(() => {
    console.log("F");
  });
});

process.nextTick(() => {
  console.log("G");
});

console.log("H");
```

**Observações e Aprendizados:**

1. o console é executado primeiro e imprimi A.
2. Encontra o setTimeout e colocar na fila do microtask
3. Depois encontra a promises e coloca na fila do microtask mas enfrete do timers.
4. Encontra o process.nextTick e é colocado na fila também
5. Continua com a codico sincrono e imprimi H
6. Ai começa a executar a fila do microtask e começando pela promose.

Odem de execução:
A
H
E
G
F
B
C

---

## Exercício 2.2: Orquestrador de Chamadas com Tolerância a Falhas (Intermédio)

### Enunciado

Implementa um serviço que consulta simultaneamente 5 serviços simulados (funções assíncronas com atrasos e possíveis falhas aleatórias). O serviço deve processar todos os resultados sem interromper a execução caso algum falhe, gerando um resumo detalhado dos sucessos e dos erros.

### Objectivo

Dominar `Promise.allSettled` e evitar o comportamento de cancelamento rápido (_fail-fast_) de `Promise.all` em cenários de integração externa.

### Conceitos Envolvidos

- `Promise.allSettled` vs `Promise.all`.
- Tratamento granular de erros por item.
- Tipagem de estados `fulfilled` e `rejected`.

### Requisitos

1. Criar uma função `fetchServiceData(serviceId: number): Promise<ServiceResponse>` que simula atraso e rejeita se `serviceId === 3`.
2. Executar as 5 consultas em paralelo.
3. Agrupar a resposta final num objecto `{ successful: [...], failed: [...] }`.

### Critérios de Avaliação

- [x] Nenhuma excepção não tratada (_UnhandledPromiseRejection_).
- [x] Execução estritamente concorrente (tempo total próximo do serviço mais lento, e não a soma sequencial).
- [x] Resposta final tipada com precisão.

### Espaço para Solução e Observações

```typescript
import process from "node:process";

export interface ServiceResponse {
  serviceId: number;
  data: string;
}

export type OrchestratorReport = {
  successful: ServiceResponse[];
  failed: { serviceId: number; reason: string }[];
};

export async function fetchServiceData(
  serviceId: number,
): Promise<ServiceResponse> {
  await new Promise((r) => setTimeout(r, 50 + serviceId * 20));

  if (serviceId === 3) {
    throw new Error(`Serviço ${serviceId} indisponível`);
  }

  return { serviceId, data: `payload-${serviceId}` };
}

export async function runOrchestrator(): Promise<OrchestratorReport> {
  const ids = [1, 2, 3, 4, 5];

  const results = await Promise.allSettled(
    ids.map((id) => fetchServiceData(id)),
  );

  const report: OrchestratorReport = { successful: [], failed: [] };

  results.forEach((result, index) => {
    const serviceId = ids[index];
    if (result.status === `fulfilled`) {
      report.successful.push(result.value);
    } else {
      const reason =
        result.reason instanceof Error
          ? result.reason.message
          : String(result.reason);
      report.failed.push({ serviceId, reason });
    }
  });

  return report;
}
```

**Observações e Aprendizados:**

1. **`Promise.allSettled` vs `Promise.all`:** `Promise.all` teria rejeitado imediatamente ao atingir o `serviceId === 3`, cancelando e ignorando o resultado de todos os outros serviços. O `Promise.allSettled` permitiu tolerância a falhas.
2. **Concorrência:** Com o `map`, todas as chamadas foram despoletadas simultaneamente. O tempo total de resposta medido foi de ~153ms (tempo do serviço mais lento: `50 + 5*20 = 150ms`), muito inferior aos 550ms do modelo sequencial.
3. **TypeScript Type Narrowing:** O compilador diferencia os tipos com base em `result.status === 'fulfilled'`, permitindo aceder a `result.value` sem cast de tipo. Para o erro em `result.reason`, foi usada a verificação defensiva `instanceof Error`.

---

## Exercício 2.3: Processamento de Grandes Volumes de Dados com Streams (Avançado)

### Enunciado

Cria um processador de ficheiros CSV volumosos (simulado com 100.000 linhas de registos). Utiliza Streams do Node.js (`stream.Readable`, `stream.Transform`, `node:stream/promises.pipeline`) para ler o ficheiro, converter campos específicos para caixa alta e gravar num ficheiro final, monitorizando o uso de memória RAM durante o processo.

### Objectivo

Processar dados contínuos sem carregar ficheiros pesados para a memória, dominando o controlo de fluxo (_Backpressure_).

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

- [x] O ficheiro completo nunca é carregado em memória com `fs.readFile`.
- [x] Tratamento seguro de encerramento de ficheiros em caso de erro através de `pipeline`.
- [x] Uso estável de memória comprovado via log.

### Espaço para Solução e Observações

```typescript
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Transform } from "node:stream";
import process from "node:process";

// 1. Função auxiliar para medir o consumo de RAM em Megabytes
function getMemoryUsageMB(): string {
  const bytes = process.memoryUsage().heapUsed;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

// 2. Função para criar um ficheiro CSV de teste com 50.000 linhas
export async function generateSampleCSV(filePath: string, totalRows = 50_000): Promise<void> {
  const writeStream = createWriteStream(filePath);
  writeStream.write("id,nome_aluno,curso,preco\n");

  for (let i = 1; i <= totalRows; i++) {
    const row = `${i},Aluno_${i},Curso_NodeJS_Backend,15000\n`;
    const canContinue = writeStream.write(row);
    if (!canContinue) {
      await new Promise((resolve) => writeStream.once("drain", resolve));
    }
  }

  writeStream.end();
  await new Promise((resolve) => writeStream.once("finish", resolve));
}

// 3. A nossa Transform Stream que processa pedaço a pedaço
export function createUpperCaseTransform(): Transform {
  return new Transform({
    transform(chunk: Buffer, _encoding, callback) {
      try {
        const textChunk = chunk.toString("utf-8");
        const upperChunk = textChunk.toUpperCase();
        callback(null, upperChunk);
      } catch (error) {
        callback(error instanceof Error ? error : new Error(String(error)));
      }
    },
  });
}

// 4. Função principal que liga o pipeline completo
export async function processCSVWithStreams(inputFile: string, outputFile: string): Promise<void> {
  console.log("🚀 A iniciar processamento com Streams...");
  console.log(`📊 Memória RAM inicial: ${getMemoryUsageMB()}`);
  
  const startTime = Date.now();

  await pipeline(
    createReadStream(inputFile, { highWaterMark: 64 * 1024 }),
    createUpperCaseTransform(),
    createWriteStream(outputFile)
  );

  const duration = Date.now() - startTime;
  console.log(`✅ Processamento concluído em ${duration}ms!`);
  console.log(`📊 Memória RAM final: ${getMemoryUsageMB()}`);
}
```

**Observações e Aprendizados:**

1. **Eficiência de Memória:** O ficheiro `input.csv` de 50.000 linhas foi processado em apenas 93ms, com a memória RAM variando apenas de 9.66 MB para 11.90 MB.
2. **Backpressure e Drenagem:** Quando o disco de escrita demora para gravar os dados gerados, `writeStream.write()` devolve `false`, e usamos `writeStream.once('drain', resolve)` para pausar a geração e evitar consumo descontrolado de RAM.
3. **Pipeline Seguro:** O uso de `pipeline` de `node:stream/promises` garante que, caso ocorra qualquer excepção no meio do processamento, todos os streams abertos são fechados de imediato.
