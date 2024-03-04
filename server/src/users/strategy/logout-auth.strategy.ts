import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LogoutAuthStrategy extends PassportStrategy(Strategy, 'logout') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies.refreshToken,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payloadData: any) {
    const payload = payloadData['_doc'] ?? payloadData;
    if (!payload?.verified)
      throw new UnauthorizedException('User is not verified.');
    return payload;
  }
}
