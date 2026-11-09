# Semana 10: Performance, Caching com Redis e Filas de Tarefas (BullMQ)

## 1. Objectivos da Semana
- Compreender técnicas de optimização de performance e redução de latência em APIs Node.js.
- Implementar estratégias de caching distribuído em memória com Redis (padrão Cache-Aside, estratégias de invalidação e TTL).
- Desacoplar tarefas pesadas e demoradas (envio de e-mails, relatórios, processamento pesado) do ciclo de vida das requisições HTTP.
- Criar e gerir filas de mensagens (Message Queues) assíncronas utilizando BullMQ e Redis.
- Configurar logs estruturados de alta performance com Pino ou Winston.

## 2. Conteúdos Previstos
- [ ] Gargalos de performance comuns em Node.js (bloqueio do Event Loop, queries ineficientes).
- [ ] Caching em memória com Redis: Leitura rápida, expiração (TTL) e invalidação na alteração.
- [ ] Arquitectura orientada a filas: Producers, Consumers, Workers e Job Queues.
- [ ] Gestão de falhas em tarefas de background: retries automáticos com backoff exponencial e Dead Letter Queues.
- [ ] Logging estruturado em formato JSON para agregação em produção.

## 3. Exercícios Práticos da Semana
Consulta o caderno de exercícios em: [`../../exercicios/semana-10.md`](file:///home/cesar-antonio/Documentos/projectos/nodejs-backend-roadmap/exercicios/semana-10.md)

## 4. Aplicação no Projecto da Empresa
- Identificar requisições que demoram mais tempo a responder na API da empresa e analisar se envolvem consultas repetidas à base de dados.
- Avaliar se existem tarefas executadas de forma síncrona que poderiam ser transferidas para background jobs.

## 5. Dúvidas e Conclusões
- Dúvida 1:
- Dúvida 2:
