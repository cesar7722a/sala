# Aula 07: Concorrência com Promises, Resiliência e Introdução a Buffers & Streams

- **Data:** 2026-11-17 (Terça-feira)
- **Semana:** Semana 02 — JavaScript Assíncrono no Backend
- **Duração da Sessão:** 90 minutos (15 min revisão | 25 min teoria | 40 min código | 10 min registo)

---

## 1. Tema

Aprofundamento de concorrência assíncrona com `Promise.all` vs `Promise.allSettled`, tratamento resiliente de erros em chamadas paralelas e introdução à gestão de memória de baixo nível com `Buffer` e `Streams` no Node.js.

---

## 2. Objectivos de Aprendizagem

- [ ] Dominar a diferença entre `Promise.all` (Fail-Fast) e `Promise.allSettled` (Tolerância a Falhas).
- [ ] Implementar agregação segura de respostas assíncronas tipadas com TypeScript estrito.
- [ ] Compreender o que é um `Buffer` no Node.js e como a memória binária fora da V8 Heap é manipulada.
- [ ] Explicar o conceito de `Stream` (fluxo contínuo de dados) e o problema crítico de *Backpressure*.
- [ ] Analisar o impacto directo de Buffers e Streams na plataforma de vídeo-aulas da empresa (uploads de vídeo sem esgotar a RAM do servidor).

---

## 3. Pré-requisitos

- Aula 06 concluída (ordem de execução do Event Loop, Microtasks vs Macrotasks).
- Repositório local configurado com Node.js v24 e TypeScript em ESM (`NodeNext`).
- Ficheiro `src/orchestrator.ts` criado e pronto para execução e teste.

---

## 4. Explicação dos Conceitos

### 4.1. Concorrência: `Promise.all` vs `Promise.allSettled`

Quando o backend precisa de executar múltiplas tarefas assíncronas independentes (ex.: consultar dados de 5 fontes diferentes, enviar 3 e-mails ou verificar múltiplos serviços):

1. **`Promise.all(promises)` (Comportamento Fail-Fast):**
   - Dispara todas as promessas em paralelo.
   - Se **uma única** promessa falhar (rejeitar), a promessa principal rejeita **imediatamente**, descartando as respostas das restantes.
   - **Quando usar:** Quando a operação depende da integridade total de todos os elementos (ex.: numa transacção bancária ou gravação atómica onde tudo tem de ter sucesso).

2. **`Promise.allSettled(promises)` (Comportamento Resiliente):**
   - Dispara todas as promessas em paralelo e **espera sempre que todas terminem**, quer tenham tido sucesso (`fulfilled`) ou falha (`rejected`).
   - Retorna um array de objectos discriminados por tipo:
     - `{ status: 'fulfilled', value: T }`
     - `{ status: 'rejected', reason: any }`
   - **Quando usar:** Quando as falhas individuais podem ser isoladas, tratadas ou reportadas sem interromper as operações bem-sucedidas (ex.: dashboards, envio em lote de notificações, verificação de gateways de pagamento).

---

### 4.2. O que é um `Buffer` no Node.js?

- O JavaScript original (no browser) manipulava primariamente strings e objectos.
- No backend, o Node.js lida directamente com dados binários brutos: ficheiros no disco, pacotes de rede TCP, streams de vídeo MP4 e imagens.
- A classe global `Buffer` representa uma sequência de bytes com tamanho fixo, alocada na memória do sistema **fora da V8 Heap** (através da memória C++ da `libuv`).

```typescript
import { Buffer } from "node:buffer";

// Aloca 10 bytes limpos (inicializados a zero)
const buf1 = Buffer.alloc(10);

// Cria um buffer a partir de uma string UTF-8
const buf2 = Buffer.from("Node.js Backend", "utf-8");
console.log(buf2); // <Buffer 4e 6f 64 65 2e 6a 73 20 42 61 63 6b 65 6e 64>
console.log(buf2.toString("hex")); // Representação hexadecimal
```

---

### 4.3. Porquê Streams? O Perigo de `fs.readFile`

Imagine que um utilizador faz upload de um vídeo de **1.5 GB** para a plataforma de vídeo-aulas:

1. **Abordagem Tradicional (`fs.readFile`):**
   - O Node.js tenta carregar todos os 1.5 GB de ficheiro para a memória RAM de uma só vez antes de executar a linha seguinte.
   - Se 3 utilizadores fizerem upload ao mesmo tempo, a aplicação precisa de 4.5 GB de RAM.
   - O limite padrão da V8 Heap é de aproximadamente 1.4 GB ~ 2 GB.
   - **Resultado:** A aplicação sofre crash fatal com erro: `FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory`.

2. **Abordagem com Streams (`fs.createReadStream`):**
   - O ficheiro é fatiado em pequenos pedaços chamados **Chunks** (por padrão 64 KB).
   - O Node.js lê 64 KB, processa ou envia para o destino (disco ou cloud storage) e liberta a memória para os próximos 64 KB.
   - A memória RAM utilizada mantém-se constante em poucos Megabytes, quer o vídeo tenha 10 MB ou 50 GB!

```mermaid
flowchart LR
    Source["Ficheiro de Vídeo (1.5 GB)"] -->|"Chunks de 64 KB"| Stream["Readable Stream"]
    Stream -->|"Transform / Compress"| TransformStream["Transform Stream"]
    TransformStream -->|"Pipeline Seguro"| Destino["Storage / Disco"]
```

---

## 5. Exemplos de Código

### Exemplo 1: Execução e Tipagem de `Promise.allSettled` (`src/orchestrator.ts`)

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

export async function fetchServiceData(serviceId: number): Promise<ServiceResponse> {
  // Simula latência de rede assíncrona não-bloqueante
  await new Promise((resolve) => setTimeout(resolve, 50 + serviceId * 20));

  if (serviceId === 3) {
    throw new Error(`Serviço ${serviceId} indisponível (HTTP 503)`);
  }

  return { serviceId, data: `payload-${serviceId}` };
}

export async function runOrchestrator(): Promise<OrchestratorReport> {
  const ids = [1, 2, 3, 4, 5];

  // Disparo simultâneo (concorrência total)
  const results = await Promise.allSettled(
    ids.map((id) => fetchServiceData(id))
  );

  const report: OrchestratorReport = { successful: [], failed: [] };

  results.forEach((result, index) => {
    const serviceId = ids[index];
    if (result.status === "fulfilled") {
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

---

## 6. Análise do Funcionamento e Armadilhas

1. **`allSettled` não rejeita:**
   - Ao contrário de `Promise.all`, o `await Promise.allSettled(...)` **nunca dispara o bloco `catch`**. Ele sempre cumpre.
   - Por essa razão, a inspecção de `result.status === "fulfilled"` vs `"rejected"` dentro do loop é obrigatória.
2. **Tempo total de execução:**
   - Como as 5 chamadas foram disparadas via `map` antes do `allSettled`, elas correm em paralelo.
   - O tempo total é igual ao tempo do serviço mais demorado (`50 + 5 * 20 = 150ms`), e **não** a soma de todos (que seria superior a 550ms em modo sequencial).
3. **Tipagem estrita do `reason`:**
   - No TypeScript com `strict: true`, o `result.reason` é de tipo `any` ou `unknown`.
   - É boa prática verificar se `result.reason instanceof Error` para extrair a propriedade `.message` com segurança.

---

## 7. Exercícios Práticos da Sessão

1. **Testar e Executar o Orquestrador:**
   - Criar um script de execução que chama `runOrchestrator()` e imprime o resumo formatado via `console.table()`.
2. **Medição da Pegada de Memória:**
   - Criar uma rotina simples comparando o consumo de `process.memoryUsage().heapUsed` antes e depois da operação.

---

## 8. Aplicação no Projecto da Empresa (Plataforma de Vídeo-Aulas)

Esta aula toca no coração do projecto corporativo da plataforma de vídeos:

1. **Upload e Armazenamento de Vídeos:**
   - Os produtores de conteúdo vão submeter aulas gravadas em formato `.mp4` ou `.mkv` de centenas de Megabytes.
   - Apenas o uso de **Streams** (`multipart/form-data` via stream no Express, encaminhado por streaming para S3/R2/MinIO) permitirá que o servidor não sofra crash de memória.
2. **Processamento Assíncrono com Filas:**
   - Quando o vídeo chega, ele não pode ser convertido (transcodificação para 720p/1080p) na mesma requisição HTTP, porque bloquearia a thread do Node.js.
   - O vídeo é recebido em stream, guardado e é colocada uma mensagem na fila (BullMQ) para processamento em background.
3. **Resiliência em Pagamentos e Notificações:**
   - Ao processar a compra de um curso, podemos precisar de: (1) notificar o produtor, (2) gerar recibo fiscal, (3) enviar e-mail de boas-vindas. Usar `Promise.allSettled` garante que mesmo que o envio do e-mail falhe temporariamente, a liberação do curso para o aluno não é cancelada!

---

## 9. Dúvidas e Dificuldades Frequentes

- **Dúvida:** *Qual a diferença entre a fila de microtarefas e o processamento de streams?*
- **Esclarecimento:** As Promises e seus callbacks (`then/await`) operam na **Microtask Queue** da V8 (alta prioridade dentro da mesma iteração do Event Loop). As Streams utilizam o sistema de eventos (`EventEmitter`) e I/O da **libuv** (macrotarefas nas fases Poll e I/O callbacks), libertando o Event Loop entre cada chunk processado.

---

## 10. O que Aprendi Hoje (Resumo de Fecho)

1. `Promise.all` cancela tudo à primeira falha (útil para operações atómicas); `Promise.allSettled` aguarda a resolução de todas as tarefas e discrimina sucessos de falhas.
2. A concorrência assíncrona reduz o tempo de resposta do endpoint para o tempo da chamada mais lenta, em vez da soma sequencial.
3. O `Buffer` é a estrutura do Node.js para lidar com bytes puros fora da V8 Heap.
4. Streams permitem processar gigabytes de dados com consumo de memória constante e previsível.

---

## 11. Critérios de Conclusão da Aula

- [ ] Código de `src/orchestrator.ts` testado com comando NPM dedicado e exibição dos resultados em tabela.
- [ ] Registo formal da solução no caderno `exercicios/semana-02.md`.
- [ ] Painel `progresso.md` actualizado com a sessão de hoje.
