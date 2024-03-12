import { BadRequestException, Injectable } from '@nestjs/common';
import { ContactRepository } from './database/contact.repository';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ContactsService {
  constructor(
    private readonly contactRepo: ContactRepository,
    private readonly userService: UsersService,
  ) {}

  async sendRequest(userID: string, contactID: string) {
    if (await this.userService.existAndVerified(contactID)) {
      const contactExist = await this.contactRepo.contactExist(
        userID,
        contactID,
      );
      if (!contactExist) {
        return await this.contactRepo.sentRequest(userID, contactID);
      }
      throw new BadRequestException(
        'You have already sent or you are already friends with this user.',
      );
    } else {
      throw new BadRequestException('Invalid Request.');
    }
  }
  // create(createContactInput: CreateContactInput) {
  //   return 'This action adds a new contact';
  // }

  // findAll() {
  //   return `This action returns all contacts`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} contact`;
  // }

  // update(id: number, updateContactInput: UpdateContactInput) {
  //   return `This action updates a #${id} contact`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} contact`;
  // }
}
