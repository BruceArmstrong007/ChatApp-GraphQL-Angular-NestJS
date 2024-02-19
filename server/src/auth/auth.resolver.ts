import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginAuthInput } from './dto/login-auth.input';
import { UsersService } from 'src/users/users.service';
import { Inject, UseGuards, forwardRef } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  @Mutation(() => Auth)
  @UseGuards(LocalAuthGuard)
  login(@Args('loginAuthData') loginAuthInput: LoginAuthInput) {
    return this.authService.login(loginAuthInput);
  }
}
