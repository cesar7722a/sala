# Exercícios — Semana 01: Node.js e Ambiente de Desenvolvimento

---

## Exercício 1.1: Diagnóstico de Ambiente e Sistema de Módulos (Básico)

### Enunciado
Cria um script utilitário em TypeScript executável via terminal que inspecciona o ambiente Node.js e o sistema operacional. O script deve ler ficheiros de configuração simulados e exibir métricas da máquina.

### Objectivo
Familiarizar-se com a execução de TypeScript via `tsx` ou `ts-node`, carregar variáveis de ambiente e utilizar módulos nativos como `os` e `process`.

### Conceitos Envolvidos
- `process.env` e ciclo de vida do processo.
- Módulo nativo `node:os` (arquitectura, CPUs, memória livre e total).
- ES Modules (`import`/`export`).

### Requisitos
1. Inicializar o projecto com `package.json` configurado com `"type": "module"`.
2. Configurar o `tsconfig.json` com modo estrito (`"strict": true`).
3. Criar o ficheiro `src/system-info.ts` que imprime de forma formatada: versão do Node.js, plataforma, total de CPUs e memória RAM disponível em Megabytes.
4. Definir um script no `package.json` chamado `"sysinfo"` que executa o ficheiro.

### Critérios de Avaliação
- [x] Executa sem erros via `npm run sysinfo`.
- [x] Utiliza importações modernas de módulos nativos (`node:os`, `node:process`).
- [x] O código está tipado sem uso de `any`.

### Espaço para Solução e Observações
```typescript
import os from "node:os";
import process from "node:process";

interface SystemMetrics {
  nodeVersion: string;
  platform: string;
  architecture: string;
  cpuCount: number;
  freeMemoryMB: number;
  totalMemoryMB: number;
  uptimeHours: number;
}

function getSystemMetrics(): SystemMetrics {
  const nodeVersion = process.version;
  const platform = os.platform();
  const architecture = os.arch();
  const cpuCount = os.cpus().length;
  const freeMemoryMB = Math.round(os.freemem() / (1024 * 1024));
  const totalMemoryMB = Math.round(os.totalmem() / (1024 * 1024));
  const uptimeHours = Number((os.uptime() / 3600).toFixed(2));

  return {
    nodeVersion,
    platform,
    architecture,
    cpuCount,
    freeMemoryMB,
    totalMemoryMB,
    uptimeHours,
  };
}

const metrics = getSystemMetrics();
console.log("=== MÉTRICAS DO SISTEMA E RUNTIME NODE.JS ===");
console.table(metrics);
```
**Observações e Aprendizados:**
- Compreensão prática dos módulos nativos com o prefixo `node:` (`node:os` e `node:process`).
- Configuração do `tsconfig.json` moderno com `module: "NodeNext"` e inclusão explícita de `"types": ["node"]` para resolução estrita de tipos do runtime.
- Criação de interface estrita `SystemMetrics` sem recurso a tipos genéricos ou `any`.

---

## Exercício 1.2: Gerenciador de Configuração com Validação (Intermédio)

### Enunciado
Desenvolve um módulo de carregamento e validação de variáveis de ambiente para uma aplicação em servidor. O módulo deve impedir que a aplicação inicie se variáveis críticas estiverem em falta.

### Objectivo
Praticar leitura de variáveis de ambiente e validação defensiva logo no momento de arranque da aplicação.

### Conceitos Envolvidos
- `process.env` e parsing de dados.
- Módulo nativo `node:fs/promises` para verificar existência de ficheiro `.env`.
- Falha rápida (*Fail-Fast Principle*).

### Requisitos
1. Criar um ficheiro `.env.example` com as variáveis: `PORT`, `NODE_ENV`, `DATABASE_URL`.
2. Criar a classe ou função `loadConfig()` que lê as variáveis. Se `DATABASE_URL` não estiver definida, o processo deve terminar com código de saída 1 (`process.exit(1)`) exibindo uma mensagem de erro clara.
3. Tipar o objecto de retorno com uma interface `AppConfig`.

### Critérios de Avaliação
- [x] Falha com mensagem explicativa se faltar uma variável obrigatória.
- [x] Atribui valores por defeito para variáveis opcionais (ex.: `PORT = 3000` se não informada).
- [x] Tipagem TypeScript rigorosa.

### Espaço para Solução e Observações
```typescript
import process from "node:process";

export interface AppConfig {
  port: number;
  nodeEnv: "development" | "production" | "test";
  databaseUrl: string;
}

export function loadConfig(): AppConfig {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error(
      "❌ [ERRO FATAL]: A variável DATABASE_URL é obrigatória e não foi definida!",
    );
    console.error(
      "👉 Define a variável no teu ficheiro .env ou no ambiente antes de iniciar.",
    );
    process.exit(1);
  }

  const port = Number(process.env.PORT) || 3000;

  const rawNodeEnv = process.env.NODE_ENV;
  const nodeEnv: AppConfig["nodeEnv"] =
    rawNodeEnv === "production" || rawNodeEnv === "test"
      ? rawNodeEnv
      : "development";

  return {
    port,
    nodeEnv,
    databaseUrl,
  };
}

const config = loadConfig();
console.log("✅ Configuração carregada com sucesso:");
console.table(config);
```
**Observações e Aprendizados:**
- Aplicação prática do padrão *Fail-Fast*: interceptar variáveis ausentes logo no arranque com `process.exit(1)` impede falhas silenciosas tardias.
- Tipagem refinada no TypeScript com união de literais (`'development' | 'production' | 'test'`) e conversão defensiva de tipos numéricos (`Number(process.env.PORT) || 3000`).
- Criação e versionamento de `.env.example` para documentar o contrato de variáveis de ambiente do projecto.

---

## Exercício 1.3: Manipulador Assíncrono de Ficheiros com Depuração no VS Code (Avançado)

### Enunciado
Constrói um utilitário de CLI que lê um directório, analisa todos os ficheiros de texto existentes e gera um relatório consolidado com o número de linhas e tamanho total em bytes. Configura o VS Code para depurar o script com breakpoints.

### Objectivo
Dominar a API `node:fs/promises`, caminhos com `node:path` e o sistema de depuração nativo do VS Code (`launch.json`).

### Conceitos Envolvidos
- `node:fs/promises` (`readdir`, `stat`, `readFile`).
- `node:path` (`join`, `resolve`, `extname`).
- Depuração com breakpoints e inspecção de variáveis no VS Code.

### Requisitos
1. Criar `src/file-analyzer.ts`.
2. Aceitar o caminho da pasta via argumento da linha de comando (`process.argv[2]`).
3. Percorrer os ficheiros de forma assíncrona e calcular o resumo.
4. Criar o ficheiro `.vscode/launch.json` configurado para executar e depurar este script.

### Critérios de Avaliação
- [ ] Não bloqueia a execução síncrona (usa exclusivamente `fs/promises`).
- [ ] Lida correctamente com directorias que não existem, lançando erro legível.
- [ ] Breakpoint configurado no VS Code é atingido com sucesso durante a depuração.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**
