import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Mantenha uma única instância global no modo de desenvolvimento para evitar connections limits
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Na vida real, o tenantId vem do contexto de autenticação (ex: JWT / NextAuth / Supabase)
    // Para fins do MVP e teste, vamos assumir um "default-tenant" ou extraí-lo do body se enviado.
    const tenantId = body.tenantId || "default-tenant-uuid";
    
    // O body deve corresponder ao shape do TenantUI
    const { themeMode, colors, typography, logoUrl } = body;

    // Prisma Upsert: Atualiza se existir, cria se não existir
    const tenantUI = await prisma.tenantUI.upsert({
      where: {
        tenantId: tenantId,
      },
      update: {
        themeMode,
        colors,
        typography,
        logoUrl,
      },
      create: {
        tenantId,
        themeMode,
        colors,
        typography,
        logoUrl,
      },
    });

    return NextResponse.json({ success: true, tenantUI }, { status: 200 });
  } catch (error: any) {
    console.error("[Branding API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao salvar configurações de tema." },
      { status: 500 }
    );
  }
}
