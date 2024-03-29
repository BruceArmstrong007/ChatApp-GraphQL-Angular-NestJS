import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from './user.schema';

@Injectable()
export class UserRepository {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(User.name) public readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(
    email: string,
    username: string,
    unHashedPass: string,
  ): Promise<User> {
    const name = 'User-' + uuidv4();
    const password = await bcrypt.hash(
      unHashedPass,
      Number(this.configService.get('HASH_SALT')),
    );
    const newUser = new this.userModel({
      username,
      password,
      name,
      email,
    });
    return await newUser.save();
  }

  async searchUsers(value: string, type: string): Promise<User[] | null> {
    const regex = new RegExp(value, 'i');
    let find = {};
    switch (type) {
      case 'name':
        find = { name: regex };
        break;
      case 'username':
        find = { username: regex };
        break;
      default:
        find = { name: regex };
    }
    return await this.userModel
      .find(find)
      .select('-password')
      .select('-verified')
      .exec();
  }

  async findUser(value: string, type: string): Promise<User | null> {
    const regex = new RegExp(value, 'i');
    let find = {};
    switch (type) {
      case 'name':
        find = { name: regex };
        break;
      case 'username':
        find = { username: regex };
        break;
      case '_id':
        find = { _id: value };
        break;
      case 'email':
        find = { email: regex };
        break;
      default:
        find = { name: regex };
    }
    return await this.userModel.findOne(find).select('-password').exec();
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    return await this.userModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
  }

  async deleteUser(id: string): Promise<User | null> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async comparePassword(id: string, password: string) {
    const user: User = await this.userModel.findById(id).exec();
    if (await bcrypt.compare(password, user.password)) {
      return true;
    }
    return false;
  }

  async verifyUser(id: string) {
    return await this.userModel
      .findByIdAndUpdate(id, { verified: true }, { new: true })
      .exec();
  }

  async resetPassword(id: string, unHashedPass: string) {
    const password = await bcrypt.hash(
      unHashedPass,
      Number(this.configService.get('HASH_SALT')),
    );
    return await this.userModel
      .findByIdAndUpdate(id, { password }, { new: true })
      .exec();
  }

  async uploadProfile(userID: string, filename: string, url: string) {
    await this.userModel
      .findByIdAndUpdate(userID, { profile: { filename, url } }, { new: true })
      .exec();
  }

  async existAndVerified(userID: string) {
    const user = await this.userModel.findById(new Types.ObjectId(userID));
    return user?.verified ? true : false;
  }
}
