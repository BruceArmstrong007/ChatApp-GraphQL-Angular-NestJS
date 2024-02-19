import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CurrentUserType } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from './database/auth.repository';
import { GraphQLExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly authRepo: AuthRepository,
  ) {}

  async login(user: CurrentUserType, context: GraphQLExecutionContext) {
    if (!user.verified) {
      throw new BadRequestException("User's email is not verified.");
    }

    const payload = { ...user };

    const { accessToken, refreshToken } = await this.authRepo.generateJWT(payload);

    const expires = Number(this.config.get('COOKIE_EXPIRATION'));
    await context['res'].cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: expires,
    });
    await context['res'].cookie('isLoggedIn', true, {
      sameSite: 'none',
      secure: true,
      maxAge: expires,
    });

    return await { accessToken, user };
  }
}
