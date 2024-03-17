import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { ContactsGQL, ContactsQuery } from '../../../generated-types';
import { ApolloQueryResult } from '@apollo/client/core';
import { contactActions } from './contact.action';

export const contact = createEffect(
  (actions$ = inject(Actions), contacts = inject(ContactsGQL)) => {
    return actions$.pipe(
      ofType(contactActions.contacts),
      exhaustMap(() => {
        return contacts
          .fetch(undefined, {
            fetchPolicy: 'no-cache',
          })
          .pipe(
            map((response: ApolloQueryResult<ContactsQuery>) => {
              return contactActions.contactsSuccess({
                response: response?.data?.contacts,
              });
            }),
            catchError(() => {
              return of(contactActions.contactsFailure());
            })
          );
      })
    );
  },
  {
    functional: true,
  }
);
