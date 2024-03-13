import { SearchUserInput } from 'src/users/dto/search-user.input';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser, CurrentUserType } from '@app/common';
import { ResponseMessage } from '@app/common';
import { LogoutAuthGuard } from './guards/logout.guard';
import { SearchUser } from './entities/searchUser.entity';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: 'register' })
  @UseGuards(JwtAuthGuard)
  async createUser(
    @Args('createUserData')
    createUserInput: CreateUserInput,
  ) {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => [SearchUser], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  async search(
    @Args('searchUsersData')
    searchUsersInput: SearchUserInput,
  ) {
    return await this.usersService.search(searchUsersInput);
  }

  @Query(() => SearchUser, { name: 'user', nullable: true })
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Args('findUserData')
    searchUserInput: SearchUserInput,
  ) {
    const user = await this.usersService.findOne(searchUserInput);
    return await user;
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async currentUser(@CurrentUser() currentUser: CurrentUserType) {
    const user = await this.usersService.findOne(
      new SearchUserInput({
        value: currentUser._id,
        type: '_id',
      }),
    );
    return await user;
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('updateUserData')
    updateUserInput: UpdateUserInput,
  ) {
    return await this.usersService.update(updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async removeUser(@Args('id', { type: () => String }) id: string) {
    return await this.usersService.remove(id);
  }

  @Query(() => ResponseMessage)
  @UseGuards(LogoutAuthGuard)
  async logout() {
    return await this.usersService.logout();
  }
}
