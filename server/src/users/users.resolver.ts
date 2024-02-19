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
    let input: Record<string, any> = { ...updateUserInput };
    if (input.profile_filename && input.profile_url) {
      input = {
        ...input,
        profile: { filename: input.profile_filename, url: input.profile_url },
      };
      delete input.profile_filename;
      delete input.profile_url;
    }
    return this.usersService.update(input);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
