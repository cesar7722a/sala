# Semana 01: Node.js e Ambiente de Desenvolvimento

## 1. Objectivos da Semana

- Compreender a arquitectura interna do Node.js (V8 Engine, libuv, C++ bindings).
- Dominar o sistema de módulos (CommonJS vs ES Modules).
- Configurar um ambiente de desenvolvimento robusto com TypeScript (`tsconfig.json`, `tsx`, scripts NPM).
- Explorar variáveis de ambiente seguras e módulos nativos essenciais (`process`, `fs/promises`, `path`, `os`).
- Configurar e utilizar sessões de depuração (debugging) com breakpoints no VS Code.

## 2. Conteúdos Previstos

- [x] Funcionamento do V8 e da libuv (Thread Pool e Event Demultiplexer).
- [x] Gestão de pacotes com NPM e anatomia do `package.json`.
- [x] Módulos CJS (`require`/`exports`) vs ESM (`import`/`export`).
- [x] Gestão de variáveis de ambiente com `process.env`.
- [x] Leitura e escrita no sistema de ficheiros com `fs/promises`.
- [x] Depuração no VS Code com `launch.json`.

## 3. Exercícios Práticos da Semana

Consulta o caderno de exercícios em: [`../../exercicios/semana-01.md`](file:///home/cesar-antonio/Documentos/projectos/nodejs-backend-roadmap/exercicios/semana-01.md)

## 4. Aplicação no `hospital_api`

- Analisar a estrutura de dependências do repositório `hospital_api` no `package.json`.
- Compreender como o `hospital_api` é compilado e executado (scripts de build/start).
- Verificar se o `hospital_api` utiliza ESM ou CJS e como as variáveis de ambiente (`.env`) são carregadas.

## 5. Dúvidas e Conclusões

_(Registar aqui dúvidas que surjam durante o estudo para discussão com o mentor)_

- **Dúvida 1:** O TypeScript não encontrava as definições de tipos para os módulos nativos `node:os` e `node:process`.
  **Conclusão:** O compilador exige mapeamento explícito do runtime. Resolvido com `"types": ["node"]` nas `compilerOptions` do `tsconfig.json`.

- **Dúvida 2:** Quando usar `process.exit(1)` em vez de lançar uma exceção (`throw`)? Sabia que `process.exit(1)` finaliza a aplicação com código de erro, mas não sabia que o seu uso deve ser restrito ao arranque da aplicação.
  **Conclusão:** `process.exit(1)` é aceitável em **arranque de aplicação** (ex.: `config.ts` a validar variáveis de ambiente obrigatórias), porque nesse ponto ainda não há recursos a libertar nem fluxos a terminar de forma controlada. Em código de biblioteca ou de lógica de negócio, deve usar-se `throw` (ou rejeição de Promise) para permitir que o chamador trate o erro — `process.exit` não corre `finally`, não faz flush de streams e mata o processo abruptamente. A aplicação prática no `hospital_api` confirma isto: o único `process.exit(1)` do projeto está no carregamento da configuração, no arranque.
