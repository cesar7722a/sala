# Projecto Integrador: Sistema de Agendamentos e Processamento em Background

---

## 1. Descrição do Projecto
O **Projecto Integrador** é a aplicação de culminação técnica da formação de 12 semanas. Representa um sistema de agendamento de serviços profissionais de alta escala e disponibilidade. O sistema combina uma suite completa de testes automatizados (unitários e de integração), caching distribuído de consultas com Redis, orquestração de filas assíncronas com BullMQ para notificações fora do ciclo HTTP, contentorização profissional multi-stage em Docker e documentação viva OpenAPI 3.0 via Swagger UI.

---

## 2. Objectivos
- Desenvolver um sistema completo com cobertura abrangente de testes automatizados (Vitest/Jest e Supertest).
- Optimizar o tempo de resposta através de estratégias eficientes de caching com Redis e invalidação controlada.
- Desacoplar tarefas morosas (envio de e-mails, relatórios, lembretes de agendamento) através de filas e workers assíncronos com BullMQ.
- Empacotar e orquestrar a solução completa (API + PostgreSQL + Redis) com Docker Compose e boas práticas de produção.
- Documentar 100% dos contratos da API com OpenAPI/Swagger UI interactivo.

---

## 3. Requisitos Funcionais (RF)
- [ ] **RF01:** O prestador de serviço deve conseguir configurar os seus horários de disponibilidade semanais.
- [ ] **RF02:** O cliente autenticado deve conseguir consultar a disponibilidade de um prestador numa determinada data (com resposta acelerada por cache no Redis).
- [ ] **RF03:** O cliente deve conseguir agendar um atendimento dentro de um horário vago.
- [ ] **RF04:** O sistema não pode permitir dois agendamentos no mesmo horário para o mesmo prestador.
- [ ] **RF05:** Ao criar um agendamento, o sistema deve disparar um job em background para enviar e-mail de confirmação ao prestador e ao cliente sem atrasar a resposta HTTP.
- [ ] **RF06:** O sistema deve agendar um job atrasado (*delayed job*) para enviar lembrete 2 horas antes do atendimento.
- [ ] **RF07:** O cliente ou prestador pode cancelar o agendamento, disparando a invalidação do cache e o reprocessamento da disponibilidade.

---

## 4. Requisitos Não Funcionais (RNF)
- [ ] **RNF01:** A suite de testes automatizados deve cobrir no mínimo 85% dos fluxos de regras de negócio em Services.
- [ ] **RNF02:** A consulta de disponibilidade diária deve ser respondida em menos de 30ms quando em cache.
- [ ] **RNF03:** Falhas de rede no envio de e-mails devem ser geridas automaticamente por retries no BullMQ com backoff exponencial.
- [ ] **RNF04:** A aplicação deve ser compilada e executada através de contentor Docker multi-stage com utilizador sem privilégios (`node`).
- [ ] **RNF05:** A aplicação deve implementar encerramento gracioso (*Graceful Shutdown*) capturando sinais `SIGTERM`.
- [ ] **RNF06:** Todos os endpoints devem estar descritos na especificação OpenAPI e acessíveis via rota `/docs`.

---

## 5. Tecnologias
- **Runtime & Linguagem:** Node.js v20+ / TypeScript
- **Framework Web:** Express.js
- **Base de Dados:** PostgreSQL & Prisma ORM
- **Cache & Filas:** Redis & BullMQ
- **Testes Automatizados:** Vitest e Supertest
- **Contentorização:** Docker & Docker Compose
- **Documentação:** Swagger UI / OpenAPI 3.0
- **Segurança:** Helmet, CORS, Argon2, JWT

---

## 6. Funcionalidades e Arquitectura de Endpoints
1. **Disponibilidade e Agendamentos:**
   - `GET /providers/:id/availability?date=YYYY-MM-DD` (com cache Redis).
   - `POST /appointments` (cria agendamento e enfileira job no BullMQ).
   - `GET /appointments/me` (lista agendamentos do utilizador logado).
   - `PATCH /appointments/:id/cancel` (cancela e invalida cache).
2. **Workers em Background:**
   - `AppointmentNotificationWorker`: consome tarefas da fila `appointments-queue`.
3. **Infraestrutura e Documentação:**
   - `GET /health`: inspecção de saúde dos conectores PostgreSQL e Redis.
   - `GET /docs`: documentação Swagger interactiva.

---

## 7. Modelo de Dados Principal (Prisma)

```prisma
enum AppointmentStatus {
  SCHEDULED
  COMPLETED
  CANCELLED
}

model Appointment {
  id          String            @id @default(uuid())
  clientId    String
  client      User              @relation("ClientAppointments", fields: [clientId], references: [id])
  providerId  String
  provider    User              @relation("ProviderAppointments", fields: [providerId], references: [id])
  date        DateTime
  status      AppointmentStatus @default(SCHEDULED)
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt

  @@index([providerId, date])
}
```

---

## 8. Critérios de Conclusão
- [ ] `npm test` executa com sucesso todos os testes unitários e de integração.
- [ ] `docker compose up -d` sobe a aplicação, PostgreSQL e Redis sem falhas.
- [ ] Caching de disponibilidade comprovado via medição de tempo e cabeçalhos.
- [ ] Workers do BullMQ processam notificações em paralelo com logs detalhados.
- [ ] Swagger UI totalmente navegável com suporte a autenticação Bearer.

---

## 9. Possíveis Melhorias Futuras
- Integração com WebSockets para notificações de agendamento em tempo real no Frontend.
- Exportação de métricas com Prometheus e visualização em Grafana.
- Multi-tenancy para suporte a múltiplas clínicas ou empresas.
