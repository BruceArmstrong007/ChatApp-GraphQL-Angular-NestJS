import { Module, forwardRef } from '@nestjs/common';
import { ContactsResolver } from './contacts.resolver';
import { ContactRepository } from './database/contact.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact } from './entities/contact.entity';
import { ContactSchema } from './database/contact.schema';
import { UsersModule } from 'src/users/users.module';
import { ContactsService } from './contacts.service';

@Module({
  providers: [ContactsResolver, ContactsService, ContactRepository],
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    forwardRef(() => UsersModule),
  ],
})
export class ContactsModule {}
