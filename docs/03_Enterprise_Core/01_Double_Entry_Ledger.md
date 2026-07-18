# Motor Contábil: Double-Entry Ledger (Partida Dobrada)

## 1. Visão Geral
O Motor Financeiro do Maestro opera sob o princípio estrito das **Partidas Dobradas** (Double-Entry Accounting). Isso significa que não existe "soma ou subtração de saldo" isolada. Toda transação financeira é composta por, no mínimo, dois lançamentos (Ledger Entries): um **Débito (Dr)** e um **Crédito (Cr)**. A soma dos débitos deve ser **exatamente igual** à soma dos créditos, resultando em uma transação balanceada (equação = 0).

Este paradigma garante imutabilidade, rastreabilidade e conformidade com padrões contábeis globais (IFRS/GAAP), sendo essencial para o novo posicionamento Enterprise/SaaS.

## 2. Princípios de Imutabilidade
> [!IMPORTANT]
> **Nenhuma transação (Transaction) ou entrada (Entry) no Ledger pode ser atualizada ou deletada (Hard Delete) após ser commitada.**
> Para corrigir um erro, deve-se criar uma **Transação de Estorno** (Reversal Transaction) que anula os efeitos da transação original através de lançamentos inversos.

## 3. Modelo de Dados (Schema Simplificado)

O coração do sistema gira em torno de 3 entidades principais:

### 3.1. `ContaContabil (Account)`
Representa a natureza do saldo. Pode ser Ativo (Asset), Passivo (Liability), Patrimônio (Equity), Receita (Revenue) ou Despesa (Expense).
- `id`: UUID
- `tenantId`: Referência ao Cliente SaaS (Isolamento Multi-tenant)
- `nome`: Ex: "Caixa Geral", "Contas a Receber", "Taxas Pagar"
- `tipo`: ENUM (ASSET, LIABILITY, EQUITY, REVENUE, EXPENSE)
- `saldoAtual`: Cache materializado (opcional, calculado através da soma das entries)

### 3.2. `TransacaoLedger (LedgerTransaction)`
Agrupa as entradas que compõem um evento de negócio.
- `id`: UUID
- `tenantId`: Referência ao Cliente
- `descricao`: Ex: "Pagamento Fatura #1024"
- `dataReferencia`: Data contábil
- `status`: PENDING, POSTED, REVERSED
- `metadata`: JSON (para linkar a pedidos, IDs de faturas externas, etc.)

### 3.3. `EntradaLedger (LedgerEntry)`
As linhas individuais de débito e crédito.
- `id`: UUID
- `transactionId`: FK para TransacaoLedger
- `accountId`: FK para ContaContabil
- `tipo`: ENUM (DEBIT, CREDIT)
- `valor`: Decimal/Int (Recomendado armazenar em centavos para evitar precisão de ponto flutuante)

## 4. Fluxo Operacional (Exemplo)

### Venda de Produto (R$ 100,00) a prazo
Quando um orçamento é aprovado e faturado:
1. **Transação**: "Faturamento Orçamento ORC-200"
2. **Débito (Dr)**: Conta `Contas a Receber (Ativo)` -> R$ 100,00
3. **Crédito (Cr)**: Conta `Receita de Vendas (Receita)` -> R$ 100,00

### Recebimento (Liquidação da Fatura)
Quando o cliente paga:
1. **Transação**: "Liquidação Fatura ORC-200"
2. **Débito (Dr)**: Conta `Banco/Caixa (Ativo)` -> R$ 100,00
3. **Crédito (Cr)**: Conta `Contas a Receber (Ativo)` -> R$ 100,00

## 5. Reporte de Integridade (Daily Audit)
Um job executado na madrugada valida matematicamente a integridade:
- **Balance Check**: Para toda `TransacaoLedger` onde `status == POSTED`, a soma dos Débitos **menos** a soma dos Créditos deve ser = 0.
- Caso haja divergência, um alerta de severidade CRITICAL é disparado para os canais de monitoramento do sistema (Terminal Logs/Webhook).
