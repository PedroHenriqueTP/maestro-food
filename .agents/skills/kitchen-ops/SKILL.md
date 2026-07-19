# SKILL: kitchen-ops
**Domain**: FoodService | **Version**: 2026.07

## Purpose
Reger as operações de cozinha (Kitchen Display Systems), controle de receitas e o fluxo rigoroso de baixa de inventário (Opex).

## Triggers
"baixa de estoque", "produção de prato", "gestão de receita", "alerta de ruptura"

## Protocol (Step-by-Step)
1. **Recipe Breakdown**: Quando um prato é sinalizado no display, extraia a árvore da receita (BOM - Bill of Materials) do Supabase.
2. **Inventory Sync**: Comande a baixa das matérias-primas e insumos na tabela correspondente.
3. **Threshold Alerts**: Se o estoque mínimo for atingido, gere evento assíncrono para o módulo Financeiro/Opex orçar a reposição no n8n.
4. **Waste Management**: Calcule e arquive percentuais de perda de manipulação nos relatórios da inteligência.

## References
- Trabalha em conjunto com `order-orchestrator` no fluxo de vida do pedido.
- MCP: Verifique as políticas de RLS e logs de auditoria do `inventory-ai` ao baixar itens de alto valor (como proteínas).
