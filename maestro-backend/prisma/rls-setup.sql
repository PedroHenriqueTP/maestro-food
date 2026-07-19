-- =========================================================================================
-- SCRIPT DE BLINDAGEM RLS (ROW LEVEL SECURITY)
-- Maestro SaaS - Genesis Iteration 7.1
-- =========================================================================================

-- Passo 1: Habilitar RLS em todas as tabelas dependentes do tenantId

ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "audit_logs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "products" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "modifier_groups" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "customers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "orders" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LedgerTransaction" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TenantUI" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "predictive_insights" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "suppliers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "marketing_budgets" ENABLE ROW LEVEL SECURITY;

-- Nota: Para tabelas de junção como "product_modifier_groups" ou "order_items", 
-- podemos herdar a segurança através do JOIN ou ativá-la explicitamente se possuírem tenantId.
-- Como essas não possuem tenantId no schema.prisma (estão dependentes da root), a segurança
-- ocorre na query das tabelas raiz (Product, Order, etc).

-- Passo 2: Criar as Políticas Universais de Isolamento
-- A política permite acesso apenas se a sessão tiver o 'app.current_tenant_id' igual ao tenantId da linha.
-- Ou, se for uma query do sistema bypass (ex: background jobs), onde a variável seja 'SERVICE_ROLE'.

CREATE POLICY tenant_isolation_users ON "users" 
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

CREATE POLICY tenant_isolation_audit_logs ON "audit_logs" 
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

CREATE POLICY tenant_isolation_categories ON "categories" 
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

CREATE POLICY tenant_isolation_products ON "products" 
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

CREATE POLICY tenant_isolation_modifier_groups ON "modifier_groups" 
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

CREATE POLICY tenant_isolation_customers ON "customers" 
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

CREATE POLICY tenant_isolation_orders ON "orders" 
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

CREATE POLICY tenant_isolation_account ON "Account" 
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

CREATE POLICY tenant_isolation_ledger_txn ON "LedgerTransaction" 
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

CREATE POLICY tenant_isolation_tenant_ui ON "TenantUI" 
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

CREATE POLICY tenant_isolation_predictive ON "predictive_insights" 
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

CREATE POLICY tenant_isolation_suppliers ON "suppliers" 
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

CREATE POLICY tenant_isolation_marketing_budgets ON "marketing_budgets" 
    USING ("tenantId" = current_setting('app.current_tenant_id', true));

-- =========================================================================================
-- COMO UTILIZAR (Backend):
-- Antes de qualquer transação ou query no Prisma, você deve executar:
-- SET LOCAL app.current_tenant_id = 'id-do-tenant';
-- =========================================================================================
