import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Contact } from '../../../generated-types';
import { ContactsRequest } from './contact.model';
export const contactActions = createActionGroup({
  source: 'User Actions',
  events: {
    Contacts: props<ContactsRequest>(),
    ContactsSuccess: props<{ response: Contact[] }>(),
    ContactsFailure: emptyProps(),
    ResetState: emptyProps(),
  },
});
