# Registo de Dificuldades e Soluções no Trabalho

Regista aqui os bloqueios, comportamentos inesperados ou bugs difíceis encontrados no código da empresa ou no ambiente de desenvolvimento, juntamente com a causa-raiz descoberta e a solução aplicada.

---

## Template de Registo

### Dificuldade: [Título Descritivo do Bloqueio]
- **Data:** AAAA-MM-DD
- **Módulo / Contexto:** [Ex.: Migrações do Prisma / Tipagem do Express / Conexão Docker]
- **Sintoma Observado:** [Qual foi a mensagem de erro ou comportamento anómalo?]
- **Causa-Raiz Investigada:** [O que realmente causou o problema após análise e debugging?]
- **Solução Implementada:** [Como foi resolvido de forma definitiva?]
- **Como Prevenir no Futuro:** [Que lição técnica fica para não repetir o erro?]

---

## Exemplo: Bloqueio de Tipos ao Estender o Express Request
- **Data:** 2026-11-XX
- **Módulo / Contexto:** Middleware de Autenticação JWT
- **Sintoma Observado:**
  O compilador TypeScript apontava erro `Property 'user' does not exist on type 'Request'` sempre que se tentava aceder a `req.user` nos controladores subsequentes.
- **Causa-Raiz Investigada:**
  A interface padrão `Request` da biblioteca `@types/express` não possui a propriedade `user`. No TypeScript, é necessário utilizar *Declaration Merging* para estender interfaces de módulos externos.
- **Solução Implementada:**
  Criou-se o ficheiro `src/@types/express.d.ts` contendo:
  ```typescript
  declare namespace Express {
    export interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
  ```
  E adicionou-se a pasta `@types` ao array `files` ou `include` do `tsconfig.json`.
- **Como Prevenir no Futuro:**
  Sempre que for necessário enriquecer objectos globais de bibliotecas em TypeScript, recorrer a ficheiros de definição de tipo ambientais (`.d.ts`) e verificar a configuração do `tsconfig.json`.

---

## Dificuldade 1: [Registo do Próximo Bloqueio]
- **Data:**
- **Módulo / Contexto:**
- **Sintoma Observado:**
- **Causa-Raiz Investigada:**
- **Solução Implementada:**
- **Como Prevenir no Futuro:**
