import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('maestro_access_token')?.value;
  const { pathname } = request.nextUrl;

  // Rotas que exigem autenticação
  const protectedRoutes = ['/admin', '/kitchen', '/waiter', '/dashboard'];
  
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  // Se tentar acessar rota protegida sem token
  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    // Salvar url de origem para redirecionar depois do login (opcional)
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // Se já estiver logado e tentar acessar /login
  if (pathname === '/login' && token) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/analytics'; // Dashboard default
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
