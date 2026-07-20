import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SECRET } from './auth.module';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // Retorna o payload extraído para ser injetado em request.user
    // O payload deve conter no mínimo { sub: userId, tenantId: string, role: string }
    return { userId: payload.sub, tenantId: payload.tenantId, role: payload.role };
  }
}
