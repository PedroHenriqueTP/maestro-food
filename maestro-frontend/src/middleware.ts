import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mock do import do Vercel Edge Config para o MVP
// Em produção: import { get } from '@vercel/edge-config';
const getEdgeConfig = async (key: string): Promise<string | null> => {
  // Simulando um dicionário no Edge Config armazenado na memória da Vercel
  const edgeStore: Record<string, string> = {
    'burguer': 'tenant-uuid-mock-1234',
    'pizzaria': 'tenant-uuid-mock-5678',
  };
  return edgeStore[key] || null;
};

// Executado nativamente no Edge Runtime da Vercel
export const config = {
  matcher: ['/api/:path*', '/admin/:path*', '/dashboard/:path*'],
};

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const hostWithoutPort = host.split(':')[0];
  const subdomain = hostWithoutPort.split('.')[0];
  
  // Extrai o tenantId: Tenta ler o header injetado ou resolve o subdomínio no Edge Config em tempo O(1)
  let tenantId = request.headers.get('x-tenant-id');
  
  if (!tenantId && subdomain !== 'localhost' && subdomain !== 'www') {
    // ⚡ A Mágica do O(1) Lookup: Zero banco de dados.
    tenantId = await getEdgeConfig(subdomain);
  } else if (subdomain === 'localhost') {
    // Modo de Desenvolvimento Local: Injeta um tenant de validação
    tenantId = 'dev-tenant-1234';
  }

  // Ignorar rotas públicas de setup/onboarding para evitar loops
  if (request.nextUrl.pathname.startsWith('/api/onboarding') || request.nextUrl.pathname.startsWith('/onboarding')) {
    return NextResponse.next();
  }

  if (!tenantId) {
    // Rejeição instantânea (Latência zero na Borda)
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Unauthorized: Missing or Invalid Tenant in Edge Config' }),
      { 
        status: 401, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }

  // Clona o request e repassa o tenantId confiavelmente para o backend ou para as rotas do Next.js
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-id', tenantId);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
