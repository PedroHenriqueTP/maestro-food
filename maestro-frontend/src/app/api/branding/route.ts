import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Proxy payload to NestJS backend
    const res = await fetch('http://localhost:3001/branding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: "Erro do Backend ao salvar configurações de tema." },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, tenantUI: data }, { status: 200 });

  } catch (error: any) {
    console.error("[Branding API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Erro crítico de rede ao salvar tema." },
      { status: 500 }
    );
  }
}
