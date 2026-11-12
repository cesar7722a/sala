# Aula 04: Ponto de Entrada, Pipeline de Build e Scripts Corporativos

- **Data:** 2026-11-12 (Quinta-feira)
- **Semana:** Semana 01
- **Duração da Sessão:** 90 minutos (15 min revisão | 25 min teoria | 40 min código | 10 min registo)

---

## 1. Tema
Construção do orquestrador de arranque central (`src/index.ts`), configuração do pipeline de compilação (*Build Pipeline*) com TypeScript (`tsc`) e padrões de scripts de produção no `package.json`.

## 2. Objectivos de Aprendizagem
- [x] Compreender por que ferramentas de execução direta (como `tsx` ou `ts-node`) não devem ser usadas em produção.
- [x] Configurar a tríade de scripts universais da indústria (`dev`, `build`, `start`) no `package.json`.
- [x] Construir o ponto de entrada central integrando validação *Fail-Fast* e telemetria do sistema operativo.
- [x] Compreender a resolução de extensões em ES Modules com TypeScript (`import ... from './modulo.js'`).
- [x] Inspecionar o código JavaScript transpilado na pasta `dist/` e executar em modo de produção puro.

## 3. Pré-requisitos
- Módulos `src/system-info.ts` e `src/config.ts` desenvolvidos nas sessões anteriores.

## 4. Explicação dos Conceitos
- **Pipeline de Compilação (*Build*):** O compilador oficial `tsc` analisa estaticamente os ficheiros TypeScript, verifica tipos e remove todas as anotações de tipagem, gerando código JavaScript limpo e de alta performance na directoria de saída configurada (`"outDir": "./dist"` no `tsconfig.json`).
- **Resolução de Ficheiros ESM:** No modo `"moduleResolution": "NodeNext"`, o padrão do ecossistema ECMAScript exige que importações relativas usem a extensão `.js`, mesmo em ficheiros `.ts`. Isso acontece porque o Node.js em runtime consome ficheiros `.js`.
- **Modo Watch (`tsx watch`):** Elimina a necessidade de pacotes legados de terceiros (como `nodemon`), monitorizando o sistema de ficheiros nativamente e reiniciando o processo instantaneamente a cada salvamento.

## 5. Exemplos de Código
```typescript
import { loadConfig } from "./config.js";
import { getSystemMetrics } from "./system-info.js";

async function bootstrap(): Promise<void> {
  // 1. Validação Fail-Fast
  const config = loadConfig();

  // 2. Telemetria do sistema
  const metrics = getSystemMetrics();

  console.log(`🚀 Servidor pronto na porta ${config.port} (${config.nodeEnv})`);
}

bootstrap();
```

## 6. Análise do Funcionamento
- Ao invocar `npm run build`, o `tsc` gera os ficheiros em `dist/`.
- Ao invocar `npm start`, o comando `node dist/index.js` roda a aplicação directamente na V8 sem qualquer camada de transpilação em memória, garantindo arranque em milissegundos e consumo mínimo de RAM.

## 7. Exercícios Práticos
- Integração de `src/index.ts` orquestrando configurações e métricas.
- Configuração e validação dos scripts `"dev"`, `"build"` e `"start"`.
- Validação do arranque compilado na directoria `dist/`.

## 8. Desafio Individual
- Comparar os scripts do `package.json` do projecto da empresa com a tríade corporativa aprendida hoje.

## 9. Aplicação no Projecto da Empresa
- Identificar como a aplicação da empresa é compilada para Docker/Produção: se usam `tsc`, `esbuild`, `swc` ou `tsup`, e como os ficheiros estáticos de produção são gerados.

## 10. Dúvidas e Dificuldades
- **Extensões `.js` em TypeScript:** Entender que em ESM moderno a convenção é apontar para o nome do ficheiro gerado no build (`./config.js`), mesmo trabalhando num ficheiro fonte `.ts`.

## 11. O que Aprendi
1. O runtime Node.js em produção nunca deve rodar compiladores dinâmicos; deve executar JavaScript pré-compilado na pasta `dist/`.
2. A tríade de scripts `"dev"`, `"build"` e `"start"` é o padrão esperado por ferramentas de CI/CD e contentores Docker.
3. Centralizar o arranque da aplicação num ficheiro `index.ts` permite garantir que nenhuma rota sobe antes de validar variáveis vitais.

## 12. Critérios de Conclusão
- [x] Ponto de entrada `src/index.ts` orquestra configurações e métricas.
- [x] `npm run build` compila sem erros para a pasta `dist/`.
- [x] `npm start` executa o JavaScript compilado em produção com sucesso.
