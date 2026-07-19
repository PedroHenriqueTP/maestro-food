# SKILL: order-orchestrator
**Domain**: FoodService | **Version**: 2026.07

## Purpose
Gerenciar o ciclo completo de pedidos na orquestração: criação → integração cozinha → delivery → faturamento via BullMQ.

## Triggers
"processar pedido", "orquestrar delivery", "atualizar status em tempo real", "faturar pedido"

## Protocol (Step-by-Step)
1. **Validate**: Autentique a carga útil utilizando Zod e verifique a conformidade de dados com as tabelas de Supabase RLS.
2. **Enqueue**: Injete o pedido na fila BullMQ com as devidas configurações de prioridade e retentativas (retry logic).
3. **Notify**: Comunique a Cozinha (kitchen-ops) e o Frontend instantaneamente via Server-Sent Events (SSE) ou WebSockets através do NestJS.
4. **Resilience**: Lide com falhas de processamento e implemente métodos de compensação (Saga pattern) para reversões seguras de pagamento (Stripe).
5. **Audit**: Gere relatórios no Intelligence HQ (Social HQ) e registre nos logs de compliance (rastreabilidade de alimentos).

## References
- Verifique os arquivos `maestro-backend/src/billing/` e `maestro-backend/src/n8n/` para o escoamento de dados.
- Utilize extensivamente MCP para "bullmq-patterns" e "supabase-rls-best-practices".
