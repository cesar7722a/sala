# Exercícios — Semana 06: Validação de Dados e Tratamento Consistente de Erros

---

## Exercício 6.1: Schemas de Validação e Inferência Estrita com Zod (Básico)

### Enunciado
Modela um esquema declarativo com Zod para o registo de um novo utilizador. O esquema deve validar formato de e-mail, força mínima da senha (mínimo de 8 caracteres, pelo menos uma letra maiúscula e um número), nome completo e data de nascimento (o utilizador deve ter pelo menos 18 anos). Extrai automaticamente o tipo TypeScript correspondente com `z.infer`.

### Objectivo
Dominar primitivos do Zod, mensagens de erro personalizadas, validações de texto e refinamentos (`.refine()`).

### Conceitos Envolvidos
- `z.string()`, `z.email()`, `z.min()`.
- `.refine((data) => condition, { message })`.
- Inferência de tipos com `z.infer<typeof schema>`.

### Requisitos
1. Criar o schema `createUserBodySchema` em `src/schemas/user.schema.ts`.
2. Inferir o tipo `CreateUserDTO`.
3. Testar a validação passando dados válidos e dados inválidos através de `schema.safeParse()`.

### Critérios de Avaliação
- [ ] Mensagens de erro em português de Angola amigáveis para cada violação de regra.
- [ ] Bloqueio eficaz para menores de 18 anos com base na data calculada.
- [ ] Tipagem TypeScript do DTO idêntica ao esquema do Zod.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**

---

## Exercício 6.2: Middleware Reutilizável de Validação para Express (Intermédio)

### Enunciado
Desenvolve um middleware genérico de alta ordem (*Higher-Order Function*) que aceita schemas Zod para qualquer combinação de `body`, `query` ou `params`. Se os dados forem válidos, substitui os valores originais da requisição pelos dados tipados e transformados pelo Zod; se forem inválidos, formata os erros de validação e interrompe o pedido com status 400.

### Objectivo
Centralizar a validação em todas as rotas da aplicação através de um middleware desacoplado e reutilizável.

### Conceitos Envolvidos
- Higher-Order Functions no Express: `validate(schema) => (req, res, next) => ...`.
- Tratamento de `ZodError` e extração de erros por campo (`error.flatten()` ou `error.issues`).
- Substituição segura de `req.body` pelos dados parseados/transformados.

### Requisitos
1. Criar `validateRequest({ body?, query?, params? })`.
2. Em caso de falha, retornar JSON padronizado com os campos problemáticos:
   ```json
   {
     "status": "fail",
     "message": "Erro de validação nos dados enviados",
     "errors": { "email": ["Formato de e-mail inválido"] }
   }
   ```
3. Ligar o middleware a uma rota de criação de recurso.

### Critérios de Avaliação
- [ ] Rota só executa o Controller se passar na validação.
- [ ] Formatação consistente dos erros sem vazar dados desnecessários da biblioteca.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**

---

## Exercício 6.3: Validação Completa de Pesquisa, Filtros e Paginação (Avançado)

### Enunciado
Constrói o schema e o fluxo de validação para um endpoint de busca avançada (`GET /products`). A query pode receber `search` (opcional, string), `minPrice` e `maxPrice` (números decimais positivos, sendo que `minPrice` não pode ser superior a `maxPrice`), `category` (UUID opcional), `page` e `limit` (números inteiros com valores padrão e limite máximo). O schema deve fazer o cast de strings para números automaticamente usando `z.coerce`.

### Objectivo
Validar parâmetros complexos de URL com conversão de tipos (*Type Coercion*) e validações cruzadas entre múltiplos campos via Zod.

### Conceitos Envolvidos
- `z.coerce.number()`.
- `.refine()` em objectos para regras envolvendo dois campos (`minPrice <= maxPrice`).
- `.default()` para paginação transparente.

### Requisitos
1. Schema `listProductsQuerySchema` implementado.
2. Garantir que `page` receba valor 1 e `limit` receba 10 caso não sejam enviados na requisição.
3. Se `minPrice = 100` e `maxPrice = 50`, retornar erro semântico claro indicando a inconsistência.

### Critérios de Avaliação
- [ ] Conversão automática sem erro de tipo NaN no Controller.
- [ ] Validação cruzada funciona perfeitamente.

### Espaço para Solução e Observações
```typescript
// Cola a tua solução aqui
```
**Observações e Aprendizados:**
