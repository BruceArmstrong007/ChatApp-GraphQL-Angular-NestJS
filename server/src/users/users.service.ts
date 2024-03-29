import { BadRequestException, Injectable } from '@nestjs/common';
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

  async validateUser(username: string, password: string) {
    const user = await this.userRepo.findUser(username, 'username');
    if (!user) {
      throw new BadRequestException('User doesnot exist.');
    }
    if (await this.userRepo.comparePassword(user._id, password)) {
      return user;
    } else {
      throw new BadRequestException('Invalid username or password.');
    }
  }

  async verifyUser(id: string) {
    return await this.userRepo.verifyUser(id);
  }

  async resetPassword(id: string, password: string) {
    return await this.userRepo.resetPassword(id, password);
  }

  async logout() {
    return await { message: 'Successfully logged out.' };
  }

  async uploadProfile(userID: string, body: any) {
    await this.userRepo.uploadProfile(userID, body?.filename, body?.url);
    return { message: 'Profile picture updated.', filename: body?.filename, url: body?.url };
  }

  async existAndVerified(userID: string) {
    return await this.userRepo.existAndVerified(userID);
  }


}
