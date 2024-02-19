import { BadRequestException, Injectable } from '@nestjs/common';
import { SearchUserInput } from './dto/search-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRepository } from './database/user.repository';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './database/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(createUserInput: CreateUserInput) {
    return await this.userRepo.createUser(
      createUserInput.email,
      createUserInput.username,
      createUserInput.password,
    );
  }

  async search(searchUserInput: SearchUserInput) {
    return await this.userRepo.searchUsers(
      searchUserInput.value,
      searchUserInput.type,
    );
  }

  async findOne(searchUserInput: SearchUserInput) {
    return await this.userRepo.findUser(
      searchUserInput.value,
      searchUserInput.type,
    );
  }

  async update(updateUserInput: UpdateUserInput) {
    let input: Record<string, any> = { ...updateUserInput };
    if (input.profile_filename && input.profile_url) {
      input = {
        ...input,
        profile: { filename: input.profile_filename, url: input.profile_url },
      };
      delete input.profile_filename;
      delete input.profile_url;
    }
    const id = input._id;
    delete input._id;
    return await this.userRepo.updateUser(id, input);
  }

  async remove(id: string) {
    return await this.userRepo.deleteUser(id);
  }

  async validateUser(body: Partial<User>) {
    const user = await this.userRepo.findUser(body?.username, 'username');
    if (!user) {
      throw new BadRequestException('User doesnot exist.');
    }
    if (await this.userRepo.comparePassword(user._id, body?.password)) {
      return user;
    } else {
      throw new BadRequestException('Invalid username or password.');
    }
  }
}
