import { Injectable } from '@nestjs/common';
import { SearchUserInput } from './dto/search-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRepository } from './database/user.repository';
import { CreateUserInput } from './dto/create-user.input';

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
    const id = updateUserInput.id;
    delete updateUserInput.id;
    return await this.userRepo.updateUser(id, updateUserInput);
  }

  async remove(id: string) {
    return await this.userRepo.deleteUser(id);
  }
}
