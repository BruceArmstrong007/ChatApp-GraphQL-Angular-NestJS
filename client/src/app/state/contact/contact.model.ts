import { EntityState } from '@ngrx/entity';

export interface Contact {
  _id: string;
  sender: string;
  receiver: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactsRequest {
  contactID: string;
}

export interface ContactsState extends EntityState<Contact> {}
