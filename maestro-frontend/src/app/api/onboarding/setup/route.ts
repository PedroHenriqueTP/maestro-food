import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Proxy payload to NestJS backend
    const res = await fetch('http://localhost:3001/tenants/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Erro do Backend na configuração." },
        { status: res.status }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Restaurante provisionado com sucesso!", 
      tenant: data 
    }, { status: 201 });

  } catch (error: any) {
    console.error("[Onboarding API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Erro crítico ao configurar o restaurante." },
      { status: 500 }
    );
  }
}
