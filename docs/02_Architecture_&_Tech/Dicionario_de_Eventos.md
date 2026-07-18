---
tipo: Especificacao_Eventos
status: Em_Desenvolvimento
tags: [arquitetura, event-driven, webhook]
---
# Dicionário de Eventos (Event-Driven Architecture)

> [!IMPORTANT]
> **Padrão de Emissão:** Todo evento deve seguir a estrutura base `Módulo.Entidade.Ação` (ex: `oms.order.created`). O payload deve conter no mínimo o `tenantId` e o `id` da entidade afetada.

## 📦 OMS (Gestão de Pedidos)

### `oms.order.created`
- **Gatilho:** Quando um novo pedido entra (via PDV, iFood, etc) e é salvo no banco.
- **Ações dos Subscribers:**
  - `KdsService`: Atualiza a tela da cozinha (WebSocket).
  - `InventoryService`: Deduz insumos da ficha técnica (Futuro).
  - `NotificationService`: Alerta o gerente se for pedido de alto valor.

### `oms.order.status_updated`
- **Gatilho:** Quando o status muda (ex: PREPARING -> READY).
- **Ações dos Subscribers:**
  - `IntegrationService`: Dispara webhook para avisar o iFood que o prato está pronto.
  - `CustomerService`: Envia WhatsApp para o cliente avisando para retirar no balcão.

## 🍔 Catálogo (Cardápio)

### `catalog.product.price_changed`
- **Gatilho:** Quando o preço de um produto ou modificador é alterado.
- **Ações dos Subscribers:**
  - `AuditService`: Registra a alteração na tabela `AuditLog`.
  - `IntegrationService`: Atualiza o preço espelho nas plataformas (iFood/Rappi).
