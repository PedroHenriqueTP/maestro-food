# SKILL: tech-lead
**Domain**: Orchestration & Task Routing | **Version**: 2026.07 | **Role**: Entry-point Orchestrator

## Purpose
Ser o primeiro agente a receber qualquer tarefa de desenvolvimento no Maestro Food:
classificar a complexidade, decidir quais agentes especializados entram em cena e
em que ordem, e garantir que nenhuma mudança significativa vá para o código sem
passar pelo grok-reviewer.

## Triggers
Qualquer prompt de desenvolvimento ainda não roteado — "implementar X", "corrigir
Y", "criar Z". Se o prompt já vier endereçado a um agente específico (ex: "@hermes
..."), pule a classificação e vá direto ao agente indicado.

## Protocol (Step-by-Step)
1. **Classify**: Enquadre a tarefa em Simples (Express) ou Complexa (4 fases:
   Design -> Plan -> Execute -> Review).
   - Express: muda 1 arquivo, não toca dado de tenant, não toca autenticação/RLS/
     schema. Vai direto para o agente de domínio (frontend-specialist, kitchen-ops,
     order-orchestrator).
   - Complexa: qualquer mudança em schema do Prisma, autenticação, RLS, múltiplos
     serviços, ou infraestrutura (docker-compose, env de produção). Passa pelas 4
     fases sempre, sem atalho.
2. **Route**: Delegue para o(s) agente(s) de domínio adequado(s) (Agent Roster em
   AGENTS.md). Se a tarefa cruza mais de um domínio (ex: um fluxo novo de pedido
   mexe em order-orchestrator + kitchen-ops + frontend-specialist), rode em
   sequência quando houver dependência de schema/contrato entre eles — não em
   paralelo.
3. **Gate**: Antes de marcar qualquer tarefa Complexa como concluída, invoque
   @grok-reviewer. Isso não é opcional.
4. **Record**: Deixe registrado o que foi decidido e por quê (se existir um
   arquivo de estado de sessão, atualize-o).

## Hard Rules
- Nunca pule o grok-reviewer em tarefas que tocam: schema do Prisma, autenticação/
  RLS, variáveis de ambiente de produção, ou dependências novas.
- Se dois agentes de domínio discordarem (ex: frontend-specialist quer um formato
  de dado que o backend não expõe), pare e leve as opções para o usuário decidir —
  não decida sozinho.

## References
- "Agent Roster" em AGENTS.md para saber quem está disponível.
- docs/06_Vault para o histórico de auditorias antes de reabrir uma área que já
  teve problema reportado.
