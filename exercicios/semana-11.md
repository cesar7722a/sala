# Exercícios — Semana 11: Contentorização com Docker e Prontidão para Produção

---

## Exercício 11.1: Dockerfile Multi-Stage Optimizado para Node.js (Básico)

### Enunciado
Escreve um `Dockerfile` multi-stage para a aplicação Node.js com TypeScript. O ficheiro deve possuir pelo menos dois estágios: um estágio de construção (`build`) onde o TypeScript é compilado e as dependências completas são instaladas, e um estágio final de execução (`production`) que copia apenas o código compilado (`dist`) e instala exclusivamente as dependências de produção (`npm ci --only=production`), executando sob um utilizador não-root (`node`).

### Objectivo
Produzir imagens Docker leves, seguras e livres de compiladores ou ficheiros fonte desnecessários em produção.

### Conceitos Envolvidos
- Docker Multi-Stage Builds (`FROM node:20-alpine AS builder` e `FROM node:20-alpine AS runner`).
- Cache de camadas com separação de `COPY package*.json ./` antes do código fonte.
- Execução segura com utilizador `USER node`.

### Requisitos
1. Criar o ficheiro `Dockerfile` e `.dockerignore` na raiz do projecto.
2. Compilar a imagem com `docker build -t api-backend:latest .`.
3. Validar que a imagem resultante é substancialmente menor que a imagem monostage tradicional.

### Critérios de Avaliação
- [ ] A directoria `node_modules` de desenvolvimento e os ficheiros `.ts` originais não estão presentes na imagem final.
- [ ] O comando `whoami` dentro do container em execução retorna `node` e não `root`.

### Espaço para Solução e Observações
```dockerfile
# Cola o teu Dockerfile e .dockerignore aqui
```
**Observações e Aprendizados:**

---

## Exercício 11.2: Orquestração Multi-Serviço com Docker Compose (Intermédio)

### Enunciado
Constrói o ficheiro `docker-compose.yml` que sobe em simultâneo 3 serviços interligados pela mesma rede virtual interna:
1. `api`: A aplicação Node.js exposta na porta 3333.
2. `postgres`: Base de dados PostgreSQL com volume persistente montado no host para não perder dados ao reiniciar.
3. `redis`: Instância de Redis para cache e filas.

### Objectivo
Permitir que qualquer novo desenvolvedor clone o repositório e inicie todo o ambiente com um único comando `docker compose up -d`.

### Conceitos Envolvidos
- Redes internas no Docker Compose (`networks`).
- Persistência com volumes nomeados (`volumes`).
- Variáveis de ambiente dinâmicas e dependência de arranque (`depends_on`).

### Requisitos
1. Configurar `docker-compose.yml` com os 3 serviços.
2. Testar a persistência: criar dados na API, parar os containers (`docker compose down`), subir novamente (`docker compose up -d`) e verificar que os dados continuam lá.

### Critérios de Avaliação
- [ ] A aplicação consegue comunicar com o PostgreSQL pelo nome do serviço (`postgres:5432`) e com o Redis por (`redis:6379`).
- [ ] Os dados persistem após a eliminação dos contentores.

### Espaço para Solução e Observações
```yaml
# Cola o teu docker-compose.yml aqui
```
**Observações e Aprendizados:**

---

## Exercício 11.3: Healthchecks e Graceful Shutdown com Sinais de Processo (Avançado)

### Enunciado
Implementa na aplicação:
1. Uma rota `/health` que testa activamente as conexões com a base de dados PostgreSQL e com o Redis, retornando status 200 OK se ambos estiverem saudáveis ou 503 Service Unavailable se algum serviço estiver em baixo.
2. Mecanismo de encerramento gracioso (*Graceful Shutdown*): capturar os sinais `SIGTERM` e `SIGINT` emitidos pelo Docker/Kubernetes, parar de aceitar novas requisições, aguardar o término dos pedidos em andamento, desconectar o Prisma Client e o Redis de forma limpa e só então finalizar o processo com `process.exit(0)`.

### Objectivo
Evitar corrupção de dados ou corte abrupto de conexões durante deploys automáticos em ambientes de produção.

### Conceitos Envolvidos
- Manipulação de sinais do sistema operativo: `process.on('SIGTERM', handler)`.
- Encerramento ordenado de pools de conexão (`server.close()`, `prisma.$disconnect()`, `redis.quit()`).
- Endpoint de prontidão (*Readiness Check*).

### Requisitos
1. Rota `GET /health` implementada.
2. Captura de `SIGTERM` no ficheiro de arranque (`server.ts`).
3. Definir um timeout de segurança (ex.: forçar fecho se demorar mais de 10 segundos).

### Critérios de Avaliação
- [ ] Ao enviar `kill <pid>` com sinal 15, a aplicação regista no log o fecho ordenado de cada serviço antes de terminar.
- [ ] `/health` reflete instantaneamente quedas na base de dados.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**
