# Registo de Funcionalidades Desenvolvidas na Empresa

Regista aqui cada funcionalidade ou correcção implementada na base de código corporativa. Utiliza a estrutura do template para medir a tua evolução técnica.

---

## Exemplo de Registo (Modelo de Referência)

### Funcionalidade: Paginação Defensiva na Listagem de Recursos
- **Data de Conclusão:** 2026-11-XX
- **Semana do Roadmap:** Semana 06 (Validação e Tratamento de Erros)
- **Problema que Pretende Resolver:**
  O endpoint de listagem trazia todos os registos da base de dados de uma só vez. À medida que o volume de dados cresceu, a requisição começou a apresentar alta latência e elevado consumo de memória no servidor Node.js.
- **Conceitos Técnicos Utilizados:**
  - Paginação baseada em *offset/limit* no ORM.
  - Validação e cast de strings numéricas com Zod.
  - Sanitização de parâmetros de consulta com limite máximo de 50 itens por página.
- **Ficheiros/Módulos Envolvidos:**
  - `src/modules/.../controllers/list-resources.controller.ts`
  - `src/modules/.../services/list-resources.service.ts`
  - `src/modules/.../repositories/...`
- **Implementação Realizada:**
  Criou-se um schema de validação para a query string forçando valores padrão (`page=1`, `limit=20`, `maxLimit=50`). O Service passou a receber os limites validados e o repositório utilizou as instruções `skip` e `take` do ORM, devolvendo os dados acompanhados de metadados de paginação.
- **Testes Executados:**
  - Testes unitários do Service validando o cálculo de `skip`.
  - Testes manuais via cliente HTTP testando limites extremos (`limit=10000`, `page=-5`).
- **Resultado Obtido:**
  Tempo médio de resposta reduzido em mais de 70% e payload previsível para a equipa de Frontend.
- **Dificuldades Encontradas:**
  Converter os query parameters do Express (que chegam sempre como strings) para inteiros válidos sem quebrar requisições sem parâmetros informados.
- **O que Aprendi:**
  A importância de nunca confiar nos parâmetros enviados pelo cliente e como a paginação protege a estabilidade de toda a infraestrutura.

---

## Registo 1: Módulo de Ingestão e Validação Criptográfica de Vídeos
- **Data de Conclusão:** 2026-11-20
- **Semana do Roadmap:** Semana 02 (JavaScript Assíncrono no Backend, Streams e Buffers)
- **Problema que Pretende Resolver:**
  Impedir o upload de ficheiros maliciosos disfarçados com extensão `.mp4` e garantir a integridade dos ficheiros de vídeo sem sobrecarregar a memória RAM do servidor com arquivos de centenas de megabytes.
- **Conceitos Técnicos Utilizados:**
  - Inspecção de cabeçalho binário (*Magic Bytes*) com `Buffer` e `fs/promises.open`.
  - Cálculo de hash SHA-256 em streaming contínuo com `node:crypto.createHash` e `node:stream/promises.pipeline`.
  - Tratamento defensivo de erros com padrão Result (`safeAsync`).
- **Ficheiros/Módulos Envolvidos:**
  - `src/video-ingestion.ts`
  - `src/safe-async.ts`
- **Implementação Realizada:**
  Implementou-se a função `isMP4Video` que lê estritamente os primeiros 8 bytes à procura da assinatura `ftyp`, a função `calculateSHA256` que extrai o checksum sem carregar o ficheiro inteiro para a memória, e o orquestrador `processVideoUpload` que articula a validação com resposta segura.
- **Testes Executados:**
  - Teste com ficheiro malicioso disfarçado (`fake-video.mp4`): rejeitado imediatamente nos primeiros 8 bytes.
  - Teste com vídeo MP4 simulado (`valid-video.mp4`): aprovado e com checksum hexadecimal gerado em milissegundos.
- **Resultado Obtido:**
  Processamento com pegada de memória fixa (< 15 MB) e proteção robusta da infraestrutura de armazenamento.
- **O que Aprendi:**
  Extensões de ficheiros nunca devem ser confiadas no Backend; o cabeçalho binário real é a única garantia de tipo MIME legítimo.

---

## Registo 2: [Nome da Segunda Funcionalidade — Ex.: Roteamento de Catálogo e Aulas em Express]
- **Data de Conclusão:**
- **Semana do Roadmap:**
- **Problema que Pretende Resolver:**
- **Conceitos Técnicos Utilizados:**
- **Ficheiros/Módulos Envolvidos:**
- **Implementação Realizada:**
- **Testes Executados:**
- **Resultado Obtido:**
- **Dificuldades Encontradas:**
- **O que Aprendi:**
