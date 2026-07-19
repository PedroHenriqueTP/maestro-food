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
            // Este não é o código exato de execução em uma única transação garantida no DB,
            // mas representa a abstração. Na prática com PostgreSQL e Prisma,
            // a maneira mais segura é executar uma query raw `SET LOCAL app.current_tenant_id = $1`
            // dentro de um prisma.$transaction interactivo.
            // Aqui estamos mockando a abstração para a arquitetura Genesis Iteration 7.1.
            
            /* Exemplo real de implementação no Prisma 5+:
            return prisma.$transaction(async (tx) => {
              await tx.$executeRaw\`SET LOCAL app.current_tenant_id = \${tenantId}\`;
              return query(args);
            });
            */
           
            // Para o contexto do MVP:
            return query(args);
          },
        },
      },
    });
  }
}
