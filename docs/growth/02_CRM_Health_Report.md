# 02 - CRM Health Report (Growth Dashboard)

Este documento atua como um template estático para ser populado dinamicamente ou para nortear a criação de dashboards de BI baseados nos dados minerados pelos Agentes de Growth.

## 📊 Métricas de Máquina de Vendas

### 1. Top of Funnel (Volume de Coleta)
- **Total de Entidades Raspadas (Últimos 7 dias):** `[MÉTRICA_AQUI]`
- **Leads Higienizados e Inseridos (Upsert):** `[MÉTRICA_AQUI]`
- **Taxa de Descarte (Duplicados / Dados Pobres):** `[MÉTRICA_AQUI]%`

### 2. Qualificação (Quality-Control Score)
- **Leads Tier A (Score > 80):** `[MÉTRICA_AQUI]`
- **Leads Tier B (Score 50-79):** `[MÉTRICA_AQUI]`
- **Leads Tier C (Score < 50):** `[MÉTRICA_AQUI]`

### 3. Bottom of Funnel (Conversão e Ações)
- **Aprovações Manuais para Contato (WhatsApp):** `[MÉTRICA_AQUI]`
- **Taxa de Resposta (Primeiro Contato):** `[MÉTRICA_AQUI]%`
- **Contas Criadas (Conversão de Lead para Tenant):** `[MÉTRICA_AQUI]`

---

## 📈 Análise de Tendência Diária

> [!TIP]
> **Insights Gerados por IA (Exemplo):** "Detectamos um pico de 24 novas hamburguerias abertas na região de 'São Paulo, SP' nas últimas 4 semanas. Sugerimos focar o disparo de cupons de onboarding especificamente para a categoria *Fast-Food* nesta semana."

| Data da Extração | Região Alvo | Leads Qualificados | Anomalias / Erros (Scout) |
| :--- | :--- | :--- | :--- |
| `2026-07-19` | São Paulo, SP | `145` | Nenhuma. |
| `2026-07-20` | Campinas, SP | `82` | Timeout na API do Maps às 14h. |
