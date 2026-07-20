import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;

    // MVP: Hardcoded login mock (O Prisma e BD estão offline no momento)
    // Quando online, bateríamos no BD: prisma.user.findUnique({ email })
    if (email === 'admin@maestro.com' && password === 'admin123') {
      const payload = {
        sub: 'usr_mock_123',
        email,
        role: 'ADMIN',
        tenantId: 'tenant_mock_1'
      };

      return {
        success: true,
        accessToken: this.jwtService.sign(payload),
        user: {
          id: payload.sub,
          email: payload.email,
          role: payload.role,
          tenantId: payload.tenantId,
          name: 'CEO Maestro'
        }
      };
    }

    throw new UnauthorizedException('Credenciais inválidas');
  }

  @Post('register')
  async register(@Body() body: any) {
    // Mock de registro
    const payload = {
      sub: 'usr_mock_new',
      email: body.email,
      role: 'MANAGER',
      tenantId: 'tenant_mock_1'
    };

    return {
      success: true,
      accessToken: this.jwtService.sign(payload),
      user: {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
        tenantId: payload.tenantId,
        name: body.name || 'Novo Usuário'
      }
    };
  }

  @Post('refresh')
  async refresh(@Body() body: any) {
    // Mock refresh
    const payload = {
      sub: 'usr_mock_123',
      email: 'admin@maestro.com',
      role: 'ADMIN',
      tenantId: 'tenant_mock_1'
    };
    return {
      success: true,
      accessToken: this.jwtService.sign(payload)
    };
  }
}
