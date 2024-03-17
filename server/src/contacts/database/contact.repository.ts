import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Contact } from './contact.schema';
import { ContactStatus } from '@app/common';

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

  async contactExist(userID: string, contactID: string) {
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

  async cancelRequest(senderID: string) {
    const senderObjectID = new Types.ObjectId(senderID);
    await this.contactModel
      .findOne({ receiver: senderObjectID })
      .deleteOne()
      .exec();
  }

  async acceptRequest(senderID: string) {
    const senderObjectID = new Types.ObjectId(senderID);
    await this.contactModel
      .findOneAndUpdate(
        { sender: senderObjectID },
        {
          status: ContactStatus.ACCEPTED,
        },
      )
      .exec();
  }

  async rejectRequest(senderID: string) {
    const senderObjectID = new Types.ObjectId(senderID);
    await this.contactModel
      .findOne({ sender: senderObjectID })
      .deleteOne()
      .exec();
  }

  async seenRequest(senderID: string) {
    const senderObjectID = new Types.ObjectId(senderID);
    await this.contactModel
      .findOneAndUpdate(
        { receiver: senderObjectID },
        {
          status: ContactStatus.FRIENDS,
        },
      )
      .exec();
  }

  async getAllContacts(contactID: string) {
    const contactObjectID = new Types.ObjectId(contactID);
    return await this.contactModel
      .find({
        $or: [
          {
            sender: contactObjectID,
          },
          {
            receiver: contactObjectID,
          },
        ],
      })
      .exec();
  }
}
