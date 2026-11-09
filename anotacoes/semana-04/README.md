# Semana 04: Arquitectura Backend, Padrões e SOLID

## 1. Objectivos da Semana
- Compreender a separação de responsabilidades no Backend: Controllers, Services e Repositories.
- Aplicar princípios de Clean Architecture e SOLID (em especial SRP e DIP) no ecossistema Node.js.
- Isolar regras de negócio da camada de transporte HTTP (Express) e da camada de persistência.
- Implementar classes de erro personalizadas (`AppError`) e um middleware centralizado para intercepção global de excepções.
- Estruturar a configuração da aplicação de forma centralizada e segura.

## 2. Conteúdos Previstos
- [ ] O padrão Controller-Service-Repository (camada de apresentação, lógica de domínio, acesso a dados).
- [ ] DTOs (Data Transfer Objects) e contratos tipados de entrada e saída.
- [ ] Princípio da Responsabilidade Única (SRP) e Inversão de Dependências (DIP).
- [ ] Classes de excepção de domínio (`AppError`, `NotFoundError`, etc.).
- [ ] Middleware global de tratamento de erros no Express: `(err, req, res, next)`.
- [ ] Configuração e validação de variáveis de ambiente no arranque.

## 3. Exercícios Práticos da Semana
Consulta o caderno de exercícios em: [`../../exercicios/semana-04.md`](file:///home/cesar-antonio/Documentos/projectos/nodejs-backend-roadmap/exercicios/semana-04.md)

## 4. Aplicação no Projecto da Empresa
- Comparar a organização de pastas da empresa com a arquitectura em 3 camadas estudada.
- Verificar onde se encontram as regras de negócio: estão nos Controllers ou devidamente isoladas em Services?
- Analisar a consistência do tratamento global de erros do projecto.

## 5. Dúvidas e Conclusões
- Dúvida 1:
- Dúvida 2:
