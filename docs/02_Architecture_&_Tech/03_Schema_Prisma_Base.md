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

// ... rest of the schema will be in maestro-backend/prisma/schema.prisma ...
```
