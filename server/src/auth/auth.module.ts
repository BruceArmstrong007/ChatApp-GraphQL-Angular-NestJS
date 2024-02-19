import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { Token, TokenSchema } from './database/token.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { LocalAuthStrategy } from './strategy/local-auth.strategy';
import { AuthRepository } from './database/auth.repository';
import { RefreshJwtStrategy } from './strategy/refresh-jwt.strategy';

@Module({
  providers: [
    AuthResolver,
    AuthRepository,
    AuthService,
    LocalAuthStrategy,
    RefreshJwtStrategy,
    JwtService,
  ],
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    MailModule,
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    forwardRef(() => UsersModule),
  ],
  exports: [AuthService, AuthRepository],
})
export class AuthModule {}
