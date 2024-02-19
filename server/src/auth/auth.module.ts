import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { Token, TokenSchema } from './database/token.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [AuthResolver, AuthService],
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
  ],
  exports: [AuthService],
})
export class AuthModule {}
