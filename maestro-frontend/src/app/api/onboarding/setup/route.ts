import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, document, subdomain, niche } = body;

    if (!name || !subdomain) {
      return NextResponse.json({ success: false, message: "Nome e Subdomínio são obrigatórios." }, { status: 400 });
    }

    // 1. Provisionamento Mágico (Auto-Configuração via Prisma Transaction)
    const result = await prisma.$transaction(async (tx) => {
      
      // 1.1 Criar o Tenant Base
      const newTenant = await tx.tenant.create({
        data: {
          name,
          document,
          subdomain,
          isActive: true,
        },
      });

      // 1.2 Configurar a Identidade Visual (Theming)
      // Como o tema inicial padrão pode ser escuro, definimos o "Black Gold"
      await tx.tenantUI.create({
        data: {
          tenantId: newTenant.id,
          themeMode: "dark",
          colors: {
            primary: "#D4AF37", // Dourado refinado
            secondary: "#1A1A1A",
            background: "#0B0C10",
            text: "#FFFFFF"
          },
        }
      });

      // 1.3 Inicializar o Motor Contábil (Conta Padrão)
      await tx.account.create({
        data: {
          tenantId: newTenant.id,
          name: "Caixa Padrão (Principal)",
          type: "ASSET",
        }
      });

      // 1.4 Mapeamento do Cardápio / CRM Básico (Categorias)
      const categoriesToCreate = [];
      if (niche === "hamburgueria") {
        categoriesToCreate.push({ tenantId: newTenant.id, name: "Combos", sortOrder: 1 });
        categoriesToCreate.push({ tenantId: newTenant.id, name: "Hambúrgueres", sortOrder: 2 });
      } else if (niche === "pizzaria") {
        categoriesToCreate.push({ tenantId: newTenant.id, name: "Pizzas Tradicionais", sortOrder: 1 });
        categoriesToCreate.push({ tenantId: newTenant.id, name: "Pizzas Especiais", sortOrder: 2 });
      } else {
        categoriesToCreate.push({ tenantId: newTenant.id, name: "Principais", sortOrder: 1 });
      }
      
      // Categoria universal
      categoriesToCreate.push({ tenantId: newTenant.id, name: "Bebidas", sortOrder: 99 });

      await tx.category.createMany({
        data: categoriesToCreate,
      });

      // Retorna o tenant configurado
      return newTenant;
    });

    // 2. Sincronização Dinâmica (Vercel Edge Config)
    // Dispara em background para garantir que o O(1) Routing esteja imediatamente disponível
    console.log(`[Edge Sync] Sincronizando novo Tenant '${subdomain}' -> ${result.id} com a Vercel API...`);
    // Em produção: 
    // await fetch('https://api.vercel.com/v1/edge-config/xxx/items', { 
    //   method: 'PATCH', 
    //   headers: { Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}` },
    //   body: JSON.stringify({ items: [{ operation: 'upsert', key: subdomain, value: result.id }] })
    // });

    return NextResponse.json({ 
      success: true, 
      message: "Restaurante provisionado com sucesso!", 
      tenant: result 
    }, { status: 201 });

  } catch (error: any) {
    console.error("[Onboarding API Error]:", error);
    
    // Tratamento de Unique Constraint falhando (ex: subdomínio repetido)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: "Este subdomínio já está em uso por outro restaurante." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Erro crítico ao configurar o restaurante." },
      { status: 500 }
    );
  }
}
