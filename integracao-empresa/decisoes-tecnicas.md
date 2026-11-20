# Registos de Decisão Técnica (ADRs)

Utiliza este ficheiro para documentar decisões técnicas de engenharia tomadas durante o desenvolvimento no projecto da empresa. Documentar o "porquê" de uma escolha técnica demonstra maturidade profissional e visão de arquitectura.

---

## Estrutura Padrão de um Registo de Decisão (ADR)

- **Título:** ADR-[Número] - [Nome da Decisão]
- **Data:** AAAA-MM-DD
- **Estado:** Proposto / Aceite pela Equipa / Substituído / Rejeitado
- **Contexto:** Qual era a situação, limitação ou dilema técnico enfrentado?
- **Decisão Adoptada:** Que solução ou tecnologia foi escolhida e porquê?
- **Alternativas Consideradas:** Quais foram as outras opções avaliadas e porque foram descartadas?
- **Consequências Positivas:** Que benefícios imediatos e futuros foram alcançados?
- **Consequências Negativas / Trade-offs:** Que compromissos ou complexidades foram assumidos?

---

## ADR-001: Ingestão de Vídeos por Streams e Processamento Assíncrono com Filas (BullMQ/Redis)
- **Data:** 2026-11-20
- **Estado:** Aceite / Em Implementação
- **Contexto:**
  Na plataforma de vídeo-aulas, os produtores realizam uploads de ficheiros pesados (vídeos em alta definição de centenas de megabytes ou gigabytes). Carregar estes ficheiros para a memória com `fs.readFile` causaria estouro imediato da V8 Heap (*JavaScript heap out of memory*) sob concorrência de múltiplos utilizadores. Além disso, processar e transcodificar vídeos dentro do ciclo síncrono de uma requisição HTTP do Express causaria *timeouts* no cliente e bloquearia a thread de processamento da aplicação.
- **Decisão Adoptada:**
  1. Recepção de uploads através de **Streams** contínuas conectadas por `pipeline` de `node:stream/promises`, lendo apenas os primeiros 8 bytes com `Buffer` para validar a assinatura binária real (*Magic Bytes* `ftyp` de contentores MP4) e calculando o hash SHA-256 em streaming.
  2. Encaminhamento do stream directamente para Object Storage (compatível com S3/Cloudflare R2/MinIO).
  3. Desacoplamento do processamento pesado: a API responde de imediato com `HTTP 202 Accepted` acompanhado do ID do vídeo e enfileira uma tarefa no **BullMQ** suportado por **Redis** para que um Worker em segundo plano efectue a transcodificação e geração de resoluções de forma assíncrona.
- **Alternativas Consideradas:**
  - *Armazenamento completo em memória com Buffers (`fs.readFile`):* Descartado por consumo inviável de RAM e risco crítico de indisponibilidade do servidor.
  - *Transcodificação síncrona na requisição HTTP:* Descartado devido aos limites de timeout de proxies (Nginx/Cloudflare fecham conexões acima de 60s) e degradação da experiência do utilizador.
- **Consequências Positivas:**
  - Consumo de memória RAM do servidor Web estável e previsível (< 30 MB) independentemente do tamanho do vídeo.
  - Resposta imediata ao Frontend em menos de 200ms (`HTTP 202`).
  - Segurança contra ficheiros maliciosos mascarados com extensão `.mp4`.
- **Trade-offs / Complexidade Adicionada:**
  - Necessidade de gerir uma instância de Redis e um processo Worker em segundo plano separado da API Express.

---

## ADR-002: [Título da Próxima Decisão — Ex.: Gateway de Pagamentos e Webhooks Resilientes]
- **Data:**
- **Estado:** Proposto
- **Contexto:**
- **Decisão Adoptada:**
- **Alternativas Consideradas:**
- **Consequências Positivas:**
- **Trade-offs:**
