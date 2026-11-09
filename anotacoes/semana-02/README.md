# Semana 02: JavaScript Assíncrono no Backend

## 1. Objectivos da Semana
- Compreender detalhadamente as fases do Event Loop no Node.js (Timers, Poll, Check, Close, Microtasks).
- Dominar o fluxo assíncrono com Promises, `async`/`await` e operadores concorrentes (`Promise.all`, `Promise.allSettled`).
- Manipular dados binários em memória utilizando a classe nativa `Buffer`.
- Trabalhar com Streams (`Readable`, `Writable`, `Transform`) e o utilitário `pipeline` para operações I/O com alta eficiência de memória.
- Implementar gestão rigorosa de excepções assíncronas.

## 2. Conteúdos Previstos
- [ ] O modelo Single-Threaded e a gestão não-bloqueante de I/O.
- [ ] Ordem de execução: `process.nextTick`, `Promise.resolve`, `setTimeout` e `setImmediate`.
- [ ] Gestão de concorrência com `Promise.all` vs `Promise.allSettled`.
- [ ] Alocação de memória e encodings com `Buffer`.
- [ ] Streams para leitura/escrita de dados volumosos sem sobrecarga de memória.
- [ ] Gestão de erros com `stream.pipeline` e eventos de erro.

## 3. Exercícios Práticos da Semana
Consulta o caderno de exercícios em: [`../../exercicios/semana-02.md`](file:///home/cesar-antonio/Documentos/projectos/nodejs-backend-roadmap/exercicios/semana-02.md)

## 4. Aplicação no Projecto da Empresa
- Identificar locais no projecto da empresa onde são lidos ou descarregados ficheiros e verificar se usam buffers inteiros em memória ou streams.
- Verificar o tratamento de chamadas assíncronas em paralelo para evitar falhas silenciosas.

## 5. Dúvidas e Conclusões
- Dúvida 1:
- Dúvida 2:
