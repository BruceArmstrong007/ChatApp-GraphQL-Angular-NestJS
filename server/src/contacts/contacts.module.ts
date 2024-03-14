import { Module, forwardRef } from '@nestjs/common';
import { ContactsResolver } from './contacts.resolver';
import { ContactRepository } from './database/contact.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact } from './entities/contact.entity';
import { ContactSchema } from './database/contact.schema';
import { UsersModule } from 'src/users/users.module';
import { ContactsService } from './contacts.service';
import { JwtAuthStrategy } from 'src/auth/strategy/jwt-auth.strategy';

@Module({
  providers: [
    ContactsResolver,
    ContactsService,
    ContactRepository,
    JwtAuthStrategy,
  ],
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    forwardRef(() => UsersModule),
  ],
})
export class ContactsModule {}
