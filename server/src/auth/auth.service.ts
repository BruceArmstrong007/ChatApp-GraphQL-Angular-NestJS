import {
  BadRequestException,
  Inject,
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { CurrentUserType, TokenType } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from './database/auth.repository';
import { GraphQLExecutionContext } from '@nestjs/graphql';
import {
  EmailVerificationInput,
  EmailVerificationLinkInput,
} from './dto/email-verification.input';
import { UsersService } from 'src/users/users.service';
import { SearchUserInput } from 'src/users/dto/search-user.input';
import { MailService } from './mail/mail.service';
import {
  ResetPasswordInput,
  ResetPasswordLinkInput,
} from './dto/reset-password.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly authRepo: AuthRepository,
    private readonly mailService: MailService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async login(user: CurrentUserType, context: GraphQLExecutionContext) {
    if (!user.verified) {
      throw new BadRequestException("User's email is not verified.");
    }

    const payload = { ...user };

    const { accessToken, refreshToken } =
      await this.authRepo.generateJWT(payload);

    const expires = new Date(
      Number(new Date()) + Number(this.config.get('COOKIE_EXPIRATION')),
    );
    await context['res'].cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: expires,
    });
    await context['res'].cookie('isLoggedIn', true, {
      sameSite: 'none',
      secure: true,
      expires: expires,
    });

    return await { accessToken, user };
  }

  async refresh(user: CurrentUserType) {
    const payload = { ...user };
    return await this.authRepo.generateRefreshToken(payload);
  }

  async emailVerificationLink(
    emailVerificationLinkInput: EmailVerificationLinkInput,
  ) {
    const unVerifiedUser = await this.userService.findOne(
      new SearchUserInput({
        value: emailVerificationLinkInput.email,
        type: 'email',
      }),
    );
    const tokenData = await this.authRepo.getToken(
      emailVerificationLinkInput.email,
      TokenType.EMAIL_VERIFICATION,
    );

    if (!unVerifiedUser) {
      throw new BadRequestException('User with this email doesnot exist.');
    }
    if (unVerifiedUser.verified) {
      throw new BadRequestException('User already verified.');
    }
    if (tokenData?.token) {
      throw new UnprocessableEntityException(
        `Verification link is already sent, please check your inbox or try again in 5 minutes`,
      );
    }
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    await this.authRepo.setToken(
      emailVerificationLinkInput.email,
      TokenType.EMAIL_VERIFICATION,
      token,
    );
    const user = {
      ...unVerifiedUser.toJSON(),
      token: token,
    };
    await this.mailService.sendVerificationEmail(user);
    return {
      message: 'Verification link has been sent to your email inbox.',
    };
  }

  async emailVerification(emailVerificationInput: EmailVerificationInput) {
    const unVerifiedUser = await this.userService.findOne(
      new SearchUserInput({
        value: emailVerificationInput.email,
        type: 'email',
      }),
    );
    const tokenData = await this.authRepo.getToken(
      emailVerificationInput.email,
      TokenType.EMAIL_VERIFICATION,
    );
    if (!unVerifiedUser) {
      throw new BadRequestException('User not found.');
    }
    if (unVerifiedUser.verified) {
      throw new BadRequestException('User already verified');
    }

    if (!tokenData || !tokenData?.token) {
      throw new UnprocessableEntityException(
        `Verification link expired, please try again in 5 minutes`,
      );
    }
    if (tokenData?.token !== emailVerificationInput.token) {
      throw new BadRequestException(
        'Something went wrong, try again after 5 minutes.',
      );
    }
    await this.userService.verifyUser(unVerifiedUser?._id);

    return { message: 'User successfully verified.' };
  }

  async resetPasswordLink(resetPasswordInput: ResetPasswordLinkInput) {
    const user = await this.userService.findOne(
      new SearchUserInput({
        value: resetPasswordInput.email,
        type: 'email',
      }),
    );
    const tokenData = await this.authRepo.getToken(
      resetPasswordInput.email,
      TokenType.RESET_PASSWORD,
    );

    if (!user) {
      throw new BadRequestException('User with this email doesnot exist.');
    }
    if (tokenData?.token) {
      throw new UnprocessableEntityException(
        `Reset Password link is already sent, please check your inbox or try again in 5 minutes`,
      );
    }
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    await this.authRepo.setToken(user.email, TokenType.RESET_PASSWORD, token);
    const userData = {
      ...user.toJSON(),
      token: token,
    };
    await this.mailService.sendResetPasswordLink(userData);
    return {
      message: 'Reset password link has been sent to your email inbox.',
    };
  }

  async resetPassword(resetPasswordInput: ResetPasswordInput) {
    const user = await this.userService.findOne(
      new SearchUserInput({
        value: resetPasswordInput.email,
        type: 'email',
      }),
    );
    const tokenData = await this.authRepo.getToken(
      resetPasswordInput.email,
      TokenType.RESET_PASSWORD,
    );
    if (!user) {
      throw new BadRequestException('User not found.');
    }
    if (!tokenData || !tokenData?.token) {
      throw new UnprocessableEntityException(
        `Reset Password link expired, please try again in 5 minutes.`,
      );
    }
    if (tokenData?.token !== resetPasswordInput.token) {
      throw new BadRequestException(
        `Something went wrong, try again after 5 minutes.`,
      );
    }
    await this.userService.resetPassword(user._id, resetPasswordInput.password);
    return { message: 'Password changed successfully.' };
  }
}
