# Aula 02: Gestão de Configuração e o Princípio Fail-Fast

- **Data:** 2026-11-10 (Terça-feira)
- **Semana:** Semana 01
- **Duração da Sessão:** 90 minutos (15 min revisão | 25 min teoria | 40 min código | 10 min registo)

---

## 1. Tema
Gestão segura de variáveis de ambiente no Node.js, mitigação dos riscos de `process.env` cego e aplicação do Princípio *Fail-Fast* no arranque da aplicação.

## 2. Objectivos de Aprendizagem
- [x] Compreender os riscos de aceder directamente a `process.env` sem validação e conversão de tipos.
- [x] Implementar o padrão *Fail-Fast* com encerramento gracioso via `process.exit(1)`.
- [x] Construir uma camada centralizada e tipada de configurações (`AppConfig`).
- [x] Estruturar o ficheiro `.env.example` como contrato de infraestrutura.

## 3. Pré-requisitos
- Ambiente Node.js com TypeScript e `tsx` configurados (Aula 01).

## 4. Explicação dos Conceitos
- **Limitações de `process.env`:** Todas as variáveis injectadas pelo sistema operacional são tratadas como strings opcionais (`string | undefined`). Valores numéricos (como portas) e booleanos necessitam de conversão e validação manual ou por esquemas.
- **Fail-Fast (Falha Rápida):** Uma aplicação Backend robusta nunca deve iniciar a escuta em portas de rede se dependências vitais (ex.: `DATABASE_URL`) não estiverem configuradas. O processo é interrompido no milissegundo zero, gerando um log de erro claro no terminal de operações.
- **Fallbacks Seguros:** Para variáveis não críticas (como `PORT` ou `NODE_ENV`), atribuem-se valores padrão defensivos para garantir que a aplicação funciona em desenvolvimento local sem atritos.

## 5. Exemplos de Código
```typescript
import process from "node:process";

export interface AppConfig {
  port: number;
  nodeEnv: "development" | "production" | "test";
  databaseUrl: string;
}

export function loadConfig(): AppConfig {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("❌ [ERRO FATAL]: DATABASE_URL não definida!");
    process.exit(1);
  }

  return {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: (process.env.NODE_ENV as AppConfig["nodeEnv"]) || "development",
    databaseUrl,
  };
}
```

## 6. Análise do Funcionamento
- Se `databaseUrl` for `undefined` ou string vazia, a condicional dispara o `process.exit(1)` imediatamente.
- O código de saída `1` sinaliza aos orquestradores (como Docker, PM2 ou Kubernetes) que houve uma falha de configuração irrecuperável.
- `Number(process.env.PORT) || 3000` garante que a porta seja tratada estritamente como número na aplicação.

## 7. Exercícios Práticos
- [Exercício 1.2 Concluído](file:///home/cesar-antonio/Documentos/projectos/nodejs-backend-roadmap/exercicios/semana-01.md#exercício-12-gerenciador-de-configuração-com-validação-intermédio): Implementação de `loadConfig()` e script `"config:check"` testado em dois cenários (com e sem variável definida).

## 8. Desafio Individual
- Analisar como a aplicação da empresa carrega as suas variáveis de ambiente: utilizam dotenv, ficheiros de configuração centralizados ou variáveis injectadas pelo container?

## 9. Aplicação no Projecto da Empresa
- Verificar se existem variáveis críticas no projecto da empresa que não possuem validação no arranque, podendo causar erros 500 imprevisíveis durante requisições de utilizadores.

## 10. Dúvidas e Dificuldades
- **Observação de Naming:** Convenções de código TypeScript recomendam PascalCase para interfaces e tipos (`AppConfig`) e camelCase para funções (`loadConfig`).

## 11. O que Aprendi
1. Nunca aceder directamente a `process.env.VARIAVEL` espalhado pelos ficheiros de controladores ou serviços.
2. Centralizar todas as variáveis numa única função ou módulo com tipagem estrita.
3. A importância do código de saída `process.exit(1)` para sistemas de monitorização de infraestrutura.

## 12. Critérios de Conclusão
- [x] O script falha imediatamente se `DATABASE_URL` não for informada.
- [x] O script carrega com sucesso com fallback para `PORT` e `NODE_ENV`.
- [x] `.env.example` versionado no repositório.
