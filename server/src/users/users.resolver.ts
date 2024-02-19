import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { SearchUserInput } from './dto/search-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserData')
    createUserInput: CreateUserInput,
  ) {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async search(
    @Args()
    searchUsersInput: SearchUserInput,
  ) {
    return await this.usersService.search(searchUsersInput);
  }

  @Query(() => User, { name: 'user' })
  async findOne(
    @Args()
    searchUserInput: SearchUserInput,
  ) {
    return await this.usersService.findOne(searchUserInput);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserData')
    updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
