import {
  Resolver,
  Query,
  Mutation,
  Args,
  GraphQLExecutionContext,
  Context,
} from '@nestjs/graphql';
import { Login, Message, Refresh } from './entities/auth.entity';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { CurrentUser, CurrentUserType } from '@app/common';
import { LoginAuthInput } from './dto/login-auth.input';
import { RefreshJwtGuard } from './guard/refresh-jwt.guard';
import {
  EmailVerificationInput,
  EmailVerificationLinkInput,
} from './dto/email-verification.input';
import {
  ResetPasswordInput,
  ResetPasswordLinkInput,
} from './dto/reset-password.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Login)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('loginAuthData') loginAuthInput: LoginAuthInput,
    @Context() context: GraphQLExecutionContext,
    @CurrentUser() user: CurrentUserType,
  ) {
    return await this.authService.login(user, context);
  }

  @Query(() => Refresh)
  @UseGuards(RefreshJwtGuard)
  async refresh(@CurrentUser() user: CurrentUserType) {
    return await this.authService.refresh(user);
  }

  @Mutation(() => Message)
  async emailVerificationLink(
    @Args('emailVerificationLinkData')
    emailVerificationLinkInput: EmailVerificationLinkInput,
  ) {
    return await this.authService.emailVerificationLink(
      emailVerificationLinkInput,
    );
  }

  @Mutation(() => Message)
  async emailVerification(
    @Args('emailVerificationData')
    emailVerificationInput: EmailVerificationInput,
  ) {
    return await this.authService.emailVerification(emailVerificationInput);
  }

  @Mutation(() => Message)
  async resetPasswordLink(
    @Args('resetPasswordLinkData')
    resetPasswordLinkInput: ResetPasswordLinkInput,
  ) {
    return await this.authService.resetPasswordLink(resetPasswordLinkInput);
  }

  @Mutation(() => Message)
  async resetPassword(
    @Args('resetPasswordData')
    resetPasswordInput: ResetPasswordInput,
  ) {
    return await this.authService.resetPassword(resetPasswordInput);
  }
}
