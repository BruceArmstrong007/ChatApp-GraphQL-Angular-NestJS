import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Contact } from './contact.schema';
import { ContactStatus } from '@app/common';
import { User } from 'src/users/database/user.schema';
@Injectable()
export class ContactRepository {
  protected readonly logger = new Logger(ContactRepository.name);

  constructor(
    @InjectModel(Contact.name) public readonly contactModel: Model<Contact>,
  ) {}

  async sentRequest(userID: string, contactID: string) {
    const userObjectID = new Types.ObjectId(userID);
    const contactObjectID = new Types.ObjectId(contactID);
    const newUser = new this.contactModel({
      sender: userObjectID,
      receiver: contactObjectID,
      status: ContactStatus.SENT,
      blocked: false,
    });
    return await newUser.save();
  }

  async contactExist(userID: string, contactID: string) : Promise<User | undefined> {
    const userObjectID = new Types.ObjectId(userID);
    const contactObjectID = new Types.ObjectId(contactID);
    return (
      await this.contactModel
        .find({
          $or: [
            {
              sender: userObjectID,
              receiver: contactObjectID,
            },
            {
              sender: contactObjectID,
              receiver: userObjectID,
            },
          ],
        })
        .exec()
    )?.[0];
  }

  // async getContacts(contactID: string): Promise<Contact[] | null> {
  //   const contactObjectID = new Types.ObjectId(contactID);

  //   return await this.contactModel
  //     .find({
  //       $or: [
  //         {
  //           receiver: contactObjectID,
  //         },
  //         {
  //           sender: contactObjectID,
  //         },
  //       ],
  //     })
  //     .exec();
  // }

  // async checkContacts(
  //   contactID1: string,
  //   contactID2: string,
  // ): Promise<Contact[]> {
  //   const contactObjectID1 = new Types.ObjectId(contactID1);
  //   const contactObjectID2 = new Types.ObjectId(contactID2);
  //   return await this.contactModel
  //     .find({
  //       $or: [
  //         {
  //           sender: contactObjectID1,
  //           receiver: contactObjectID2,
  //         },
  //         {
  //           sender: contactObjectID2,
  //           receiver: contactObjectID1,
  //         },
  //       ],
  //     })
  //     .exec();
  // }

  // async checkContact(
  //   contactID1: string,
  //   contactID2: string,
  // ): Promise<Contact | null> {
  //   const contactObjectID1 = new Types.ObjectId(contactID1);
  //   const contactObjectID2 = new Types.ObjectId(contactID2);
  //   return await this.contactModel
  //     .findOne({ sender: contactObjectID1, receiver: contactObjectID2 })
  //     .exec();
  // }

  // async deleteUserContact(contactID: string) {
  //   const contactObjectID = new Types.ObjectId(contactID);
  //   await this.contactModel
  //     .find({
  //       $or: [{ sender: contactObjectID }, { receiver: contactObjectID }],
  //     })
  //     .deleteMany()
  //     .exec();
  // }

  // async updateContact(
  //   contactID1: string,
  //   contactID2: string,
  //   status: ContactStatus,
  // ) {
  //   const contactObjectID1 = new Types.ObjectId(contactID1);
  //   const contactObjectID2 = new Types.ObjectId(contactID2);
  //   await this.contactModel
  //     .findOneAndUpdate(
  //       { sender: contactObjectID1, receiver: contactObjectID2 },
  //       { status: status },
  //       { new: true },
  //     )
  //     .exec();
  // }

  // async blockContact(contactID1: string, contactID2: string) {
  //   const contactObjectID1 = new Types.ObjectId(contactID1);
  //   const contactObjectID2 = new Types.ObjectId(contactID2);
  //   await this.contactModel
  //     .findOneAndUpdate(
  //       { sender: contactObjectID1, receiver: contactObjectID2 },
  //       { blocked: true },
  //       { new: true },
  //     )
  //     .exec();
  // }

  // async deleteContact(contactID1: string, contactID2: string) {
  //   const contactObjectID1 = new Types.ObjectId(contactID1);
  //   const contactObjectID2 = new Types.ObjectId(contactID2);
  //   await this.contactModel
  //     .find({
  //       $or: [
  //         { sender: contactObjectID1, receiver: contactObjectID2 },
  //         { sender: contactObjectID2, receiver: contactObjectID1 },
  //       ],
  //     })
  //     .deleteMany()
  //     .exec();
  // }
}
