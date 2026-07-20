import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// As rotas que exigem autenticação
const protectedRoutes = ['/admin', '/kitchen'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Verifica se a rota atual começa com algum dos prefixos protegidos
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected) {
    // Lê o cookie que foi injetado pelo Login
    const token = request.cookies.get('maestro_token')?.value;

    if (!token) {
      // Se não houver token, chuta para a tela de login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
