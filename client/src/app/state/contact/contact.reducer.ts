import { createFeature, createReducer, on } from '@ngrx/store';
import { contactActions } from './contact.action';
import { Contact, ContactsState } from './contact.model';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const adapter: EntityAdapter<Contact> = createEntityAdapter<Contact>({
  selectId: (s: Contact) => s._id,
});

const initialState = adapter.getInitialState();

export const contactFeature = createFeature({
  name: 'contact',
  reducer: createReducer(
    initialState,
    on(
      contactActions.contactsSuccess,
      (state, action): ContactsState =>
        adapter.setAll(action?.response, { ...state })
    ),

    on(
      contactActions.resetState,
      (state): ContactsState => ({ ...state, ...initialState })
    )
  ),
});
