import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { SearchUserInput } from './dto/search-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: 'register' })
  async createUser(
    @Args('createUserData')
    createUserInput: CreateUserInput,
  ) {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async search(
    @Args('searchUsersData')
    searchUsersInput: SearchUserInput,
  ) {
    return await this.usersService.search(searchUsersInput);
  }

  @Query(() => User, { name: 'user', nullable: true })
  async findOne(
    @Args('findUserData')
    searchUserInput: SearchUserInput,
  ) {
    return await this.usersService.findOne(searchUserInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserData')
    updateUserInput: UpdateUserInput,
  ) {
    return await this.usersService.update(updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => String }) id: string) {
    return await this.usersService.remove(id);
  }
}
