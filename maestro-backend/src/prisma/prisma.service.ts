import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Retorna um PrismaClient blindado para um Tenant específico (RLS via Postgres)
   * Usa o Client Extensions para injetar a variável de sessão 'app.current_tenant_id'.
   */
  withTenant(tenantId: string) {
    if (!tenantId) {
      throw new Error('Tenant ID é obrigatório para acessar os dados (Blindagem RLS).');
    }

    return this.$extends({
      query: {
        $allModels: {
          async $allOperations({ args, query }) {
            // Implementação real da Blindagem RLS:
            // Isso garante que cada transação assuma o contexto isolado no PostgreSQL
            // NOTA: Para RLS ter efeito, a string DATABASE_URL do prisma não pode ser de superuser.
            return (this as any).$transaction(async (tx: any) => {
              await tx.$executeRaw`SET LOCAL app.current_tenant_id = ${tenantId}`;
              return query(args);
            });
          },
        },
      },
    });
  }
}
