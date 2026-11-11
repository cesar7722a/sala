# Aula 03: Sistema de Ficheiros Assíncrono e Depuração Profissional

- **Data:** 2026-11-11 (Quarta-feira)
- **Semana:** Semana 01
- **Duração da Sessão:** 90 minutos (15 min revisão | 25 min teoria | 40 min código | 10 min registo)

---

## 1. Tema
Operações I/O assíncronas no sistema de ficheiros com `node:fs/promises`, manipulação segura de caminhos com `node:path` e depuração com breakpoints no VS Code (`.vscode/launch.json`).

## 2. Objectivos de Aprendizagem
- [x] Compreender por que métodos síncronos de ficheiros (`fs.*Sync`) bloqueiam o Event Loop e são proibidos em servidores web.
- [x] Utilizar a API moderna de Promises `node:fs/promises` (`readdir`, `stat`, `readFile`).
- [x] Manipular caminhos multiplataforma com `node:path` (`join`, `resolve`, `extname`).
- [x] Configurar e utilizar o depurador nativo do VS Code com *breakpoints*, *call stack* e inspecção de variáveis.

## 3. Pré-requisitos
- Conhecimentos das Aulas 01 e 02 (módulos ESM, tipagem estrita e execução com `tsx`).

## 4. Explicação dos Conceitos
- **I/O Não-Bloqueante com a libuv:** Quando invocamos `fs.readFile()`, o Node.js delega a leitura do disco para a Thread Pool da biblioteca libuv em C/C++. A thread principal de JavaScript fica livre para responder a outras requisições e é notificada assim que os dados estiverem disponíveis.
- **`node:path` Multiplataforma:** Garante que o separador de directórios seja interpretado correctamente tanto em sistemas baseados em Unix (Linux/macOS usam `/`) quanto no Windows (usa `\`).
- **Tratamento de Erros de Sistema Operacional:** Erros como `ENOENT` (ficheiro/directoria inexistente) ou `EACCES` (sem permissão) devem ser interceptados por blocos `try/catch` para fornecer mensagens de diagnóstico claras e impedir o colapso silencioso da aplicação.
- **Depuração com `.vscode/launch.json`:** Permite executar o script directamente a partir do VS Code com `npx tsx`, pausando o fluxo em linhas específicas (*breakpoints*) e possibilitando a inspecção das variáveis em tempo real.

## 5. Exemplos de Código
```typescript
import fs from "node:fs/promises";
import path from "node:path";

export async function countLines(filePath: string): Promise<number> {
  const content = await fs.readFile(filePath, "utf-8");
  return content.split("\n").length;
}
```

## 6. Análise do Funcionamento
- `fs.readdir(resolvedPath, { withFileTypes: true })` devolve instâncias de `Dirent` que permitem verificar se cada entrada é ficheiro (`entry.isFile()`) ou directório (`entry.isDirectory()`) sem necessidade de chamadas adicionais ao disco.
- `fs.stat(filePath)` obtém metadados do inode do sistema de ficheiros, incluindo o tamanho em bytes (`fileStat.size`) e datas de modificação.

## 7. Exercícios Práticos
- [Exercício 1.3 Concluído](file:///home/cesar-antonio/Documentos/projectos/nodejs-backend-roadmap/exercicios/semana-01.md#exercício-13-manipulador-assíncrono-de-ficheiros-com-depuração-no-vs-code-avançado): Criação de `src/file-analyzer.ts`, configuração do `.vscode/launch.json` e script `"analyze"` no `package.json`.

## 8. Desafio Individual
- Identificar no projecto da empresa se existem operações com ficheiros (ex.: uploads, leitura de templates, relatórios) e se utilizam métodos assíncronos ou streams.

## 9. Aplicação no Projecto da Empresa
- Aplicar o launch configuration do VS Code para depurar testes ou rotas locais do projecto da empresa sem recurso exclusivo a `console.log`.

## 10. Dúvidas e Dificuldades
- **Boas Práticas de Argumentos CLI:** Uso de `process.argv[2]` para ler parâmetros passados pelo terminal e validação preventiva com mensagem de uso caso o argumento não seja informado.

## 11. O que Aprendi
1. Métodos síncronos de `fs` congelam a thread de execução do Node.js e devem ser evitados em servidores de produção.
2. `node:path.join` e `node:path.resolve` evitam bugs de concatenação de caminhos entre diferentes sistemas operativos.
3. O depurador do VS Code acelera drasticamente a detecção da causa-raiz de bugs complexos.

## 12. Critérios de Conclusão
- [x] Utilitário `file-analyzer.ts` analisa ficheiros assincronamente.
- [x] Lida com caminhos inexistentes exibindo erro explicativo e saindo com status 1.
- [x] Configuração de depuração pronta em `.vscode/launch.json`.
