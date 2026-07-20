import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

export interface ProvisionTenantDto {
  restaurantName: string;
  subdomain: string;
  adminEmail: string;
  adminName: string;
}

@Injectable()
export class TenantsService {
  constructor(private readonly prisma: PrismaService) {}

  async provisionTenant(dto: ProvisionTenantDto) {
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        // 1. Criar o Tenant
        const tenant = await tx.tenant.create({
          data: {
            name: dto.restaurantName,
            subdomain: dto.subdomain,
          },
        });

        // 2. Criar o Usuário Dono (Admin SaaS)
        const user = await tx.user.create({
          data: {
            name: dto.adminName,
            email: dto.adminEmail,
            password: 'hash_temporario_ou_ignorado', // Senha real seria gerada/hashada depois
            role: 'OWNER',
            tenantId: tenant.id,
          },
        });

        // 3. Configurar UI Padrão
        await tx.tenantUI.create({
          data: {
            tenantId: tenant.id,
            themeMode: 'dark', // Padrão Black Gold
            colors: {
              primary: '#d4af37',
              background: '#050505'
            }
          }
        });

        // 4. Criar Conta Contábil Padrão (Caixa)
        await tx.account.create({
          data: {
            tenantId: tenant.id,
            name: 'Caixa Principal',
            type: 'ASSET'
          }
        });

        // 5. Categorias Padrão
        await tx.category.createMany({
          data: [
            { name: 'Pratos Principais', tenantId: tenant.id, sortOrder: 1 },
            { name: 'Bebidas', tenantId: tenant.id, sortOrder: 2 },
            { name: 'Sobremesas', tenantId: tenant.id, sortOrder: 3 }
          ]
        });

        return { tenant, user };
      });

      return result;
    } catch (error) {
      console.error('Erro ao provisionar Tenant:', error);
      throw new InternalServerErrorException('Falha no provisionamento do Tenant');
    }
  }
}
