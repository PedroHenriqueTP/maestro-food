# Engine de Importação/Exportação (Parsing)

## 1. Objetivo
Permitir que clientes corporativos (SaaS) migrem dados de planilhas locais (CSV/XLSX) de forma fluida e direta para o Ledger e para o CRM, suportando processamento em massa de dados.

## 2. Arquitetura do Engine (Node.js/Next.js)

Para suportar alta performance, o Maestro usará ferramentas de streams de dados, evitando o estouro de memória (OOM - Out of Memory) no processamento de planilhas gigantes.

### 2.1. Bibliotecas e Componentes
- **Frontend (Client-side Parsing)**: Uso da biblioteca `Papaparse` para validar colunas básicas e `SheetJS` para Excel *antes* do envio.
- **Backend (Stream Processing)**: `fast-csv` acoplado ao Prisma.

### 2.2. Fluxo de Importação (Ledger)
1. **Upload & Parse**: O cliente envia o arquivo contendo seu histórico financeiro.
2. **Validação Estrutural (Pipeline)**: Verifica se as colunas essenciais existem (`Data`, `Valor`, `Descricao`, `Debito/Credito`).
3. **Mapeamento de Contas**: Interface gráfica onde o cliente arrasta a "Coluna X" para o campo "Conta do Sistema Y".
4. **Transformação (Double-Entry)**: Para cada linha do extrato importado, o sistema cria um par de *Ledger Entries* (Débito e Crédito) internamente.
5. **Persistência em Lote (Batching)**: O Prisma utiliza `createMany` para persistir as entradas em lotes de 1.000 registros, garantindo eficiência transacional.

## 3. Fluxo de Exportação (Relatórios)
1. **Geração em Background**: Relatórios financeiros pesados (ex: Balancete de Verificação) são enfileirados e processados de forma assíncrona.
2. **Stream de Saída**: Os dados são transmitidos em chunks, gerando o PDF/Excel diretamente para o Storage do cliente (ex: S3/Supabase Storage) ou gerando um link de download expirável.
