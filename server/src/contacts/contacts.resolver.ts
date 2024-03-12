import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { SendRequestInput } from './dto/send-request.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser, CurrentUserType } from '@app/common';
/**
 * Todo: 6 API endpoints
 *   1.) Send request to contact
 *   2.) Cancel sent request to contact
 *   3.) Accept incoming request from contact
 *   4.) Send seen request to convert accepted to friends
 *   5.) Reject incoming request from contact
 *   6.) Get all contacts for the user
 * @export
 * @class ContactsResolver
 */
@Resolver(() => Contact)
@UseGuards(JwtAuthGuard)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Mutation(() => Contact, { name: 'sendRequest' })
  async sendRequest(
    @CurrentUser() user: CurrentUserType,
    @Args('sendRequestInput') sendRequestInput: SendRequestInput,
  ) {
    return await this.contactsService.sendRequest(user?._id, sendRequestInput?.contactID);
  }

  // @Mutation(() => Contact)
  // updateContact(@Args('updateContactInput') updateContactInput: UpdateContactInput) {
  //   return this.contactsService.update(updateContactInput.id, updateContactInput);
  // }

  // @Mutation(() => Contact)
  // removeContact(@Args('id', { type: () => Int }) id: number) {
  //   return this.contactsService.remove(id);
  // }
}
