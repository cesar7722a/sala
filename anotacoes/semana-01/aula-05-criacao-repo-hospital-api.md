# Aula 05: Fundação do Repositório `hospital_api` e Fecho da Semana 01

- **Data:** 2026-11-14 (Sábado)
- **Semana:** Semana 01
- **Duração da Sessão:** 90 minutos (15 min revisão | 25 min teoria | 40 min código | 10 min registo)

---

## 1. Tema

Consolidação da Semana 01 e criação da fundação do repositório `hospital_api` — ponto de partida do projecto pessoal que acompanhará as 12 semanas. Definição do âmbito, decisões técnicas iniciais (ESM, `tsconfig` estrito, scripts `dev`/`build`/`start`) e correcção do `catch (error: any)` do Exercício 1.3.

## 2. Objectivos de Aprendizagem

- [ ] Consolidar os conceitos das Aulas 01–04 num repositório real e reprodutível.
- [ ] Criar a estrutura base do `hospital_api` com ESM, TypeScript estrito e scripts NPM universais.
- [ ] Registar as decisões técnicas no `README.md` (ESM vs CJS, versão do Node, âmbito do projecto).
- [ ] Corrigir o `catch (error: any)` do Exercício 1.3 para `catch (error: unknown)` com _type guard_.
- [ ] Planear a primeira fatia funcional do `hospital_api` para a Semana 02: importador CSV de doentes em streaming.

## 3. Pré-requisitos

- Aulas 01–04 concluídas e Exercícios 1.1, 1.2 e 1.3 resolvidos.
- Node.js LTS v24, `tsx`, VS Code e Git configurados.

## 4. Explicação dos Conceitos

- **Porquê um repositório próprio:** o `hospital_api` é o fio condutor das 12 semanas. Cada semana acrescenta uma fatia vertical (importador CSV → endpoints REST → camadas → Prisma → validação → auth → RBAC → testes → cache/filas → Docker → OpenAPI). Sem uma base estável na Semana 01, as semanas seguintes acumulam dívida técnica.
- **Decisão ESM vs CJS:** adoptamos **ESM** (`"type": "module"`) porque é o padrão moderno, alinha com `NodeNext` no TypeScript e é o que o ecossistema (Express 5, Prisma, Vitest) está a adoptar. O custo é a exigência de extensões `.js` nas importações relativas.
- **`tsconfig.json` estrito:** `strict: true`, `module`/`moduleResolution: "NodeNext"`, `types: ["node"]`, `outDir: "dist"`, `rootDir: "src"`. Isto garante que o compilador e o Language Server do VS Code vêem os tipos do runtime.
- **Tríade de scripts:** `dev` (`tsx watch src/index.ts`), `build` (`tsc`), `start` (`node dist/index.js`). É o contrato esperado por CI/CD e Docker (Semana 11).
- **`catch (error: unknown)`:** com `strict: true`, o TypeScript obriga a tratar o erro como `unknown`. O acesso a `error.code` exige um _type guard_ (ex.: `error instanceof Error && "code" in error`) ou uma verificação explícita do código (`ENOENT`). O `any` fura a tipagem e é o único ponto do Exercício 1.3 a corrigir.

## 5. Exemplos de Código

**Estrutura mínima do `hospital_api` no primeiro commit:**
