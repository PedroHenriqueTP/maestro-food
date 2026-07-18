import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // MVP: Lendo do Header 'x-tenant-id'.
    // Em produção, isso virá extraído e validado do JWT Token
    const tenantId = request.headers['x-tenant-id'];

    if (!tenantId) {
      throw new UnauthorizedException('Acesso negado: Contexto de Tenant ausente. Informe o header x-tenant-id.');
    }

    // Injeta o tenantId no request para ser usado pelos Controllers
    request.tenantId = tenantId;

    return true;
  }
}
