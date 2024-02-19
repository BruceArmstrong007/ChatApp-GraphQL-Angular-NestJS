import {
  Resolver,
  Query,
  Mutation,
  Args,
  GraphQLExecutionContext,
  Context,
} from '@nestjs/graphql';
import { Auth } from './entities/auth.entity';
import { UsersService } from 'src/users/users.service';
import { Inject, UseGuards, forwardRef } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { CurrentUser, CurrentUserType } from '@app/common';
import { LoginAuthInput } from './dto/login-auth.input';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  @Mutation(() => Auth)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('loginAuthData') loginAuthInput: LoginAuthInput,
    @Context() context: GraphQLExecutionContext,
    @CurrentUser() user: CurrentUserType,
  ) {
    return await this.authService.login(user, context);
  }
}
