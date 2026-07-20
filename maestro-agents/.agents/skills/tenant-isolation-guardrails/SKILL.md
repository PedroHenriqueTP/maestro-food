# SKILL: tenant-isolation-guardrails
**Domain**: Multi-tenancy & Security | **Version**: 2026.07 | **Role**: Guardrail transversal — consultar antes de qualquer código que toque dado de tenant

## Purpose
Este projeto já teve ocorrências da mesma classe de bug: TenantGuard confiando em header do cliente, RLS sem efeito por causa da conexão superuser, e canais Supabase Realtime/Socket.io sem filtro de tenant. Este skill existe para nenhum agente introduzir vazamento de dados.

## Quando consultar (Triggers)
Qualquer tarefa que crie ou edite: um Guard/Middleware que resolve tenantId; uma query Prisma/Supabase numa tabela com coluna tenantId; um canal ou room de WebSocket/Supabase Realtime; uma rota de API que recebe tenantId como parâmetro.

## Regras Não Negociáveis
1. tenantId nunca vem de um header, body ou query param não assinado. Só pode vir de dentro de um JWT validado no backend. Se você está lendo `req.headers['x-tenant-id']` ou `body.tenantId` direto para decidir de quem são os dados, pare.
2. Toda tabela com `tenantId` precisa desse campo com `@relation` para `Tenant` no schema.prisma, não só o campo solto — garante integridade referencial.
3. RLS só protege alguma coisa se a conexão do Prisma não for superuser/dono das tabelas. Antes de confiar em qualquer policy, confirme que a DATABASE_URL de produção aponta pra um role de aplicação sem BYPASSRLS e sem ser owner.
4. Todo canal de tempo real (WebSocket, Supabase Realtime, SSE) precisa ser nomeado/filtrado por tenant. Nunca use um nome de canal genérico tipo `public:orders` — use `tenant:${tenantId}:orders`. No NestJS Gateway, sempre coloque o cliente numa room (`client.join('tenant:' + tenantId)`) e emita só pra ela (`this.server.to(room).emit(...)`), nunca global.
5. Ao criar uma entidade que referencia outra por ID, valide explicitamente que a entidade referenciada pertence ao mesmo tenantId antes de persistir.

## Checklist antes de considerar uma feature "pronta"
- [ ] tenantId vem de um JWT validado, não de input do cliente
- [ ] Toda query nova filtra explicitamente por tenantId (defesa em profundidade, mesmo com RLS habilitado)
- [ ] Todo canal/room de tempo real é nomeado por tenant
- [ ] Toda FK entre tabelas com tenantId foi validada como same-tenant antes do write
- [ ] Se isso mexeu em RLS/schema/autenticação, o grok-reviewer foi invocado

## References
- docs/06_Vault (auditoria de 2026-07-19) tem os casos reais que motivaram este skill.
- prisma/rls-setup.sql tem as policies de referência.
