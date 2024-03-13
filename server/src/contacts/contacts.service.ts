import { BadRequestException, Injectable } from '@nestjs/common';
import { ContactRepository } from './database/contact.repository';
import { UsersService } from 'src/users/users.service';
import { ContactStatus } from '@app/common';

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

  async cancelRequest(userID: string, contactID: string) {
    if (await this.userService.existAndVerified(contactID)) {
      const contactExist = await this.contactRepo.contactExist(
        userID,
        contactID,
      );
      if (contactExist) {
        if (
          contactExist?.['status'] === ContactStatus.SENT &&
          contactExist?.['sender'].toString() === userID
        ) {
          await this.contactRepo.cancelRequest(contactID);
          return await { message: 'Request cancelled successfully.' };
        }
      }
      throw new BadRequestException('Invalid Request.');
    } else {
      throw new BadRequestException('Invalid Request.');
    }
  }

  async seenRequest(userID: string, contactID: string) {
    if (await this.userService.existAndVerified(contactID)) {
      const contactExist = await this.contactRepo.contactExist(
        userID,
        contactID,
      );
      if (contactExist) {
        if (
          contactExist?.['status'] === ContactStatus.ACCEPTED &&
          contactExist?.['sender'].toString() === userID
        ) {
          await this.contactRepo.seenRequest(contactID);
          return await { message: 'Request seen successfully.' };
        }
      }
      throw new BadRequestException('Invalid Request.');
    } else {
      throw new BadRequestException('Invalid Request.');
    }
  }

  async acceptRequest(userID: string, contactID: string) {
    if (await this.userService.existAndVerified(contactID)) {
      const contactExist = await this.contactRepo.contactExist(
        userID,
        contactID,
      );
      if (contactExist) {
        if (
          contactExist?.['status'] === ContactStatus.SENT &&
          contactExist?.['sender'].toString() === contactID
        ) {
          await this.contactRepo.acceptRequest(contactID);
          return await { message: 'Request accepted successfully.' };
        }
      }
      throw new BadRequestException('Invalid Request.');
    } else {
      throw new BadRequestException('Invalid Request.');
    }
  }

  async rejectRequest(userID: string, contactID: string) {
    if (await this.userService.existAndVerified(contactID)) {
      const contactExist = await this.contactRepo.contactExist(
        userID,
        contactID,
      );
      if (contactExist) {
        if (
          contactExist?.['status'] === ContactStatus.SENT &&
          contactExist?.['sender'].toString() === contactID
        ) {
          await this.contactRepo.rejectRequest(contactID);
          return await { message: 'Request rejected successfully.' };
        }
      }
      throw new BadRequestException('Invalid Request.');
    } else {
      throw new BadRequestException('Invalid Request.');
    }
  }

  async getAllContacts(contactID: string) {
    return await this.contactRepo.getAllContacts(contactID);
  }
}
