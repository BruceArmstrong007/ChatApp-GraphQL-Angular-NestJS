import {
  Resolver,
  Query,
  Mutation,
  Args,
  GraphQLExecutionContext,
  Context,
} from '@nestjs/graphql';
import { Login, Refresh } from './entities/auth.entity';
import { UsersService } from 'src/users/users.service';
import { Inject, UseGuards, forwardRef } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { CurrentUser, CurrentUserType } from '@app/common';
import { LoginAuthInput } from './dto/login-auth.input';
import { RefreshJwtGuard } from './guard/refresh-jwt.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

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

}
