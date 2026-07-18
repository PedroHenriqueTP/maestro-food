---
tipo: Schema_Prisma
status: Validado
versao: 1.1.0
tags: [core, prisma, database, supabase, rls, food-service]
---
# Schema Prisma - Base Core Maestro

## Descrição
Estrutura relacional multi-tenant para isolamento de dados de operadores de food service. 
- **Estratégia de Isolamento:** Filtro obrigatório por `tenantId` em todas as queries operacionais. Preparado para integração com Supabase RLS (Row Level Security).
- **Relacionamentos:** Cascade deletes configurados para manter integridade ao remover produtos ou pedidos.
- **Evolução V1.1:** Inclusão de Categorias, Modificadores (Adicionais) e Tabela de Auditoria.

## Código Prisma Completo

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// CRM Models
model Customer {
  id        String   @id @default(uuid())
  tenantId  String
  name      String
  document  String?
  email     String?
  phone     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Financial Ledger (Double-Entry)
model Account {
  id        String        @id @default(uuid())
  tenantId  String
  name      String
  type      AccountType
  entries   LedgerEntry[]
}

enum AccountType {
  ASSET
  LIABILITY
  EQUITY
  REVENUE
  EXPENSE
}

model LedgerTransaction {
  id          String        @id @default(uuid())
  tenantId    String
  description String
  date        DateTime
  status      String        @default("POSTED") // PENDING, POSTED, REVERSED
  metadata    Json?
  entries     LedgerEntry[]
  createdAt   DateTime      @default(now())
}

model LedgerEntry {
  id            String             @id @default(uuid())
  transactionId String
  transaction   LedgerTransaction  @relation(fields: [transactionId], references: [id])
  accountId     String
  account       Account            @relation(fields: [accountId], references: [id])
  type          EntryType
  amount        Int                // Armazenado em centavos
}

enum EntryType {
  DEBIT
  CREDIT
}

// Theming Engine
model TenantUI {
  id          String   @id @default(uuid())
  tenantId    String   @unique
  themeMode   String   @default("system")
  colors      Json?
  typography  Json?
  logoUrl     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```
