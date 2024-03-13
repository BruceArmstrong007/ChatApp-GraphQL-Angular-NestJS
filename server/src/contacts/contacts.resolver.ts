import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser, CurrentUserType } from '@app/common';
import { ContactInput } from './dto/contact.input';
import { ResponseMessage } from '@app/common';
/**
 * Completed: 6 API endpoints
 *   1.) Send request to contact
 *   2.) Cancel sent request to contact
 *   3.) Accept incoming request from contact
 *   4.) Send seen request to convert accepted to friends
 *   5.) Reject incoming request from contact
 *   6.) Get all contacts related to the user
 * @export
 * @class ContactsResolver
 */
@Resolver(() => Contact)
@UseGuards(JwtAuthGuard)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Mutation(() => ResponseMessage, { name: 'sendRequest' })
  async sendRequest(
    @CurrentUser() user: CurrentUserType,
    @Args('sendRequestData') sendRequestInput: ContactInput,
  ) {
    return await this.contactsService.sendRequest(
      user?._id,
      sendRequestInput?.contactID,
    );
  }

  @Mutation(() => ResponseMessage, { name: 'cancelRequest' })
  async cancelRequest(
    @CurrentUser() user: CurrentUserType,
    @Args('cancelRequestData') cancelRequestInput: ContactInput,
  ) {
    return await this.contactsService.cancelRequest(
      user?._id,
      cancelRequestInput?.contactID,
    );
  }

  @Mutation(() => ResponseMessage, { name: 'seenRequest' })
  async seenRequest(
    @CurrentUser() user: CurrentUserType,
    @Args('seenRequestData') seenRequestInput: ContactInput,
  ) {
    return await this.contactsService.seenRequest(
      user?._id,
      seenRequestInput?.contactID,
    );
  }

  @Mutation(() => ResponseMessage, { name: 'acceptRequest' })
  async acceptRequest(
    @CurrentUser() user: CurrentUserType,
    @Args('acceptRequestData') acceptRequestInput: ContactInput,
  ) {
    return await this.contactsService.acceptRequest(
      user?._id,
      acceptRequestInput?.contactID,
    );
  }

  @Mutation(() => ResponseMessage, { name: 'rejectRequest' })
  async rejectRequest(
    @CurrentUser() user: CurrentUserType,
    @Args('rejectRequestData') rejectRequestInput: ContactInput,
  ) {
    return await this.contactsService.rejectRequest(
      user?._id,
      rejectRequestInput?.contactID,
    );
  }

  @Query(() => [Contact], { name: 'getAllContacts' })
  async getAllContacts(
    @Args('getAllContactsData')
    getAllContactsInput: ContactInput,
  ) {
    return await this.contactsService.getAllContacts(
      getAllContactsInput?.contactID,
    );
  }
}
