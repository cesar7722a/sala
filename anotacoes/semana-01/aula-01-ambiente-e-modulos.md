# Aula 01: Arquitectura do Node.js, Módulos e Ambiente de Desenvolvimento

- **Data:** 2026-11-09 (Segunda-feira)
- **Semana:** Semana 01
- **Duração da Sessão:** 90 minutos (15 min revisão | 25 min teoria | 40 min código | 10 min registo)

---

## 1. Tema
Arquitectura interna do Node.js (V8 Engine e libuv), transição de CommonJS para ES Modules (ESM) e configuração de ambiente de desenvolvimento com TypeScript estrito.

## 2. Objectivos de Aprendizagem
- [x] Compreender o papel do motor Google V8 e da biblioteca libuv no modelo não-bloqueante.
- [x] Distinguir as características e comportamentos de CommonJS vs ES Modules.
- [x] Configurar um ambiente Node.js com TypeScript, `tsx` e `@types/node` com resolução `NodeNext`.
- [x] Utilizar módulos nativos com o prefixo moderno `node:` (`node:os`, `node:process`).

## 3. Pré-requisitos
- Node.js LTS v24 instalado.
- Terminal Linux e VS Code configurados.

## 4. Explicação dos Conceitos
- **Motor V8:** Responsável por compilar o JavaScript para código de máquina através de JIT e gerir a memória (Call Stack, Heap e Garbage Collector).
- **Biblioteca libuv:** Implementa o Event Loop e gere uma Thread Pool interna (4 threads por defeito) para operações de sistema bloqueantes (I/O em disco, DNS).
- **ES Modules (`"type": "module"`):** Padrão moderno onde o carregamento de módulos é assíncrono e analisado estaticamente, sem existência nativa de variáveis globais legadas como `__dirname`.
- **Resolução de Tipos Node.js:** A flag `"types": ["node"]` no `tsconfig.json` assegura que o compilador TypeScript e o Language Server do VS Code encontram as definições de tipos dos módulos nativos `node:*`.

## 5. Exemplos de Código
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
  return {
    nodeVersion: process.version,
    platform: os.platform(),
    architecture: os.arch(),
    cpuCount: os.cpus().length,
    freeMemoryMB: Math.round(os.freemem() / (1024 * 1024)),
    totalMemoryMB: Math.round(os.totalmem() / (1024 * 1024)),
    uptimeHours: Number((os.uptime() / 3600).toFixed(2)),
  };
}

console.table(getSystemMetrics());
```

## 6. Análise do Funcionamento
- `process.version` devolve a versão do runtime Node.js sem sobrecarga.
- `os.cpus().length` lê a quantidade de núcleos de processador disponíveis no servidor.
- `os.freemem()` e `os.totalmem()` retornam bytes inteiros; a conversão dividindo por `1024 * 1024` produz o valor legível em Megabytes.

## 7. Exercícios Práticos
- [Exercício 1.1 Concluído](file:///home/cesar-antonio/Documentos/projectos/nodejs-backend-roadmap/exercicios/semana-01.md#exercício-11-diagnóstico-de-ambiente-e-sistema-de-módulos-básico): Criação do utilitário `src/system-info.ts` e script `"sysinfo"` no `package.json`.

## 8. Desafio Individual
- Identificar como os scripts de arranque da aplicação da empresa configuram as variáveis de ambiente e o sistema de módulos.

## 9. Aplicação no Projecto da Empresa
- Verificar se o projecto da empresa utiliza ESM (`"type": "module"`) ou CJS clássico e alinhar a forma como os módulos internos são importados.

## 10. Dúvidas e Dificuldades
- **Dificuldade:** Erro do TypeScript indicando falta de definições de tipos para `node:os` e `node:process`.
- **Solução:** Adicionada a instrução `"types": ["node"]` dentro de `compilerOptions` no `tsconfig.json` para mapear explicitamente o pacote `@types/node`.

## 11. O que Aprendi
1. O Node.js não é apenas o motor V8; a libuv é a peça fundamental que permite I/O não-bloqueante.
2. Usar o prefixo `node:` é a boa prática oficial moderna para evitar colisões com pacotes do NPM.
3. Como estruturar um projecto TypeScript limpo no Backend com tipagem estrita desde o primeiro dia.

## 12. Critérios de Conclusão
- [x] O script executa sem erros através de `npm run sysinfo`.
- [x] Tipagem completa e estrita sem `any`.
- [x] Apontamento de aula registado.
