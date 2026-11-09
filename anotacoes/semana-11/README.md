# Semana 11: Contentorização com Docker e Prontidão para Produção

## 1. Objectivos da Semana
- Compreender os fundamentos de contentorização e isolamento de processos com Docker.
- Construir Dockerfiles multi-stage optimizados para aplicações Node.js e TypeScript, minimizando o tamanho final da imagem e excluindo dependências de desenvolvimento.
- Orquestrar múltiplos serviços (API, PostgreSQL, Redis) em ambiente local com Docker Compose.
- Implementar boas práticas de segurança em contentores (execução com utilizador sem privilégios `node`).
- Configurar endpoints de healthcheck e mecanismos de encerramento gracioso (Graceful Shutdown) para sinais `SIGTERM` e `SIGINT`.

## 2. Conteúdos Previstos
- [ ] Dockerfile multi-stage (estágio de build vs estágio de runtime).
- [ ] Optimização do cache de camadas no Docker.
- [ ] Orquestração com Docker Compose: portas, variáveis de ambiente e volumes para persistência de dados.
- [ ] Encerramento gracioso (Graceful Shutdown) de servidores HTTP e pools de conexões de base de dados.
- [ ] Healthchecks activos para monitorização de orquestradores (Kubernetes/Docker Swarm).

## 3. Exercícios Práticos da Semana
Consulta o caderno de exercícios em: [`../../exercicios/semana-11.md`](file:///home/cesar-antonio/Documentos/projectos/nodejs-backend-roadmap/exercicios/semana-11.md)

## 4. Aplicação no Projecto da Empresa
- Analisar os ficheiros Dockerfile e docker-compose utilizados pela empresa.
- Verificar o tamanho da imagem actual e se o processo é executado como `root` ou com utilizador restrito.

## 5. Dúvidas e Conclusões
- Dúvida 1:
- Dúvida 2:
