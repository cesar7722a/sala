# Aula 11: Desafio Integrador e Consolidação da Semana 02

- **Data:** 2026-11-21 (Sábado)
- **Semana:** Semana 02 — JavaScript Assíncrono no Backend
- **Duração da Sessão:** 90 minutos (15 min revisão | 25 min consolidação teórica | 40 min desafio prático | 10 min fecho de fase)

---

## 1. Tema

Consolidação global da **Fase 1: Fundamentos de Node.js** (Semanas 01 e 02), revisão integradora de programação assíncrona, execução do Desafio Integrador da Semana 02 e fecho formal do painel de progresso antes da entrada na **Fase 2: APIs e Arquitectura (Semana 03 - HTTP & Express)**.

---

## 2. Objectivos de Aprendizagem

- [ ] Consolidar mentalmente o mapa completo do runtime Node.js (V8 $\rightarrow$ libuv $\rightarrow$ Event Loop $\rightarrow$ Microtasks $\rightarrow$ Macrotasks $\rightarrow$ Streams).
- [ ] Executar o Desafio Prático Integrador da Semana 02 em `src/index.ts`.
- [ ] Concluir e arquivar o resumo semanal formal em `anotacoes/semana-02/resumo-semana-02.md`.
- [ ] Marcar a Semana 02 como ✅ Concluída em `progresso.md` totalizando 18h lectivas.

---

## 3. Mapa Mental Integrador da Semana 02

| Conceito | Mecanismo Interno | Quando Usar no Backend |
| :--- | :--- | :--- |
| **Microtasks** | `process.nextTick` e Promises (`then/await`) | Operações de altíssima prioridade executadas imediatamente após o código síncrono. |
| **Macrotasks** | Timers (`setTimeout`), I/O callbacks, Check (`setImmediate`) | Tarefas de I/O de rede, disco e temporizadores agendados pela `libuv`. |
| **`Promise.all`** | Rejeição *Fail-Fast* à primeira falha | Operações atómicas onde tudo tem de ter sucesso (ex.: transacções financeiras). |
| **`Promise.allSettled`** | Aguarda todas as tarefas e discrimina status | Concorrência tolerante a falhas (ex.: consultas múltiplas, webhooks). |
| **`Buffer`** | Memória binária fora do V8 Heap (C++) | Leitura de bytes brutos, assinaturas de ficheiros (*Magic Bytes*), criptografia. |
| **`Streams`** | Fluxo contínuo em chunks (64 KB) | Ficheiros grandes (vídeos, CSVs massivos) para manter a RAM estável e plana. |
| **`pipeline`** | Gestão de encerramento seguro e *Backpressure* | Conectar Leitor $\rightarrow$ Transformador $\rightarrow$ Escritor sem fugas de memória. |
| **`safeAsync`** | Result Pattern `[error, data]` | Substituir `try/catch` aninhados por código limpo e defensivo no TypeScript. |

---

## 4. O Desafio Prático Integrador de Hoje

No ficheiro de entrada [`src/index.ts`](file:///home/cesar-antonio/Documentos/projectos/nodejs-backend-roadmap/src/index.ts), vamos transformar o ficheiro num **CLI de Demonstração e Orquestração** que carrega a configuração (`src/config.ts`), apresenta os recursos do sistema (`src/system-info.ts`) e executa um diagnóstico completo de integridade dos serviços desenvolvidos nas Semanas 01 e 02:
1. Teste de Configuração com Fail-Fast.
2. Teste de Concorrência com `Promise.allSettled` (`runOrchestrator`).
3. Teste de Ingestão de Vídeo com Magic Bytes e SHA-256 (`processVideoUpload`).

---

## 5. Como Criar do Zero (Anatomia do Bootstrap Integrador)

```typescript
import { loadConfig } from "./config.js";
import { getSystemMetrics } from "./system-info.js";
import { runOrchestrator } from "./orchestrator.js";
import { processVideoUpload } from "./video-ingestion.js";
import { safeAsync } from "./safe-async.js";

export async function bootstrap(): Promise<void> {
  console.log("==================================================");
  console.log("   NODE.JS BACKEND ROADMAP — BOOTSTRAP FASE 1     ");
  console.log("==================================================\n");

  // 1. Carrega configuração defensiva
  const [errConfig, config] = await safeAsync(Promise.resolve(loadConfig()));
  if (errConfig) {
    console.error("❌ Falha na inicialização da configuração:", errConfig.message);
    return;
  }
  console.log(`🌍 Ambiente: ${config.nodeEnv.toUpperCase()} | Porta: ${config.port}`);

  // 2. Apresenta métricas da máquina
  const metrics = getSystemMetrics();
  console.log(`💻 Sistema: ${metrics.platform} | CPU Cores: ${metrics.cpus} | Memória Livre: ${metrics.freeMemoryMB} MB\n`);

  // 3. Executa diagnóstico dos serviços da Fase 1
  console.log("🚀 A verificar orquestração paralela...");
  const [errOrch, report] = await safeAsync(runOrchestrator());
  if (!errOrch && report) {
    console.log(`✅ Concorrência: ${report.successful.length} serviços OK, ${report.failed.length} falhas tratadas.`);
  }

  console.log("\n🎉 Fase 1 (Fundamentos e Programação Assíncrona) 100% Operacional!\n");
}
```

---

## 6. Critérios de Conclusão da Aula e da Semana 02

- [ ] Todos os 3 exercícios formais da Semana 02 registados e testados.
- [ ] Bootstrap integrador executado com `npm start`.
- [ ] Ficheiro `resumo-semana-02.md` preenchido.
- [ ] `progresso.md` com Semana 02 marcada como ✅ Concluída e 18h / 108h acumuladas.
