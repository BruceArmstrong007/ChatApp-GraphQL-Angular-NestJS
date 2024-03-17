import { CanActivateFn } from '@angular/router';
import { ContactsGQL, ContactsQuery } from '../../../generated-types';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApolloQueryResult } from '@apollo/client/core';
import { Store } from '@ngrx/store';
import { map, catchError, of } from 'rxjs';
import { contactActions } from '../../state/contact/contact.action';
import { AlertComponent } from '../components/alert/alert.component';

export const contactsGuard: CanActivateFn = () => {
  const contacts = inject(ContactsGQL);
  const store = inject(Store);
  const alert = inject(MatSnackBar);
  return contacts
    .fetch(
      {
        ContactsData: {},
      },
      {
        fetchPolicy: 'no-cache',
      }
    )
    .pipe(
      map((response: ApolloQueryResult<ContactsQuery>) => {
        if (response?.data?.contacts) {
          store.dispatch(
            contactActions.contactsSuccess({
              response: response?.data?.contacts,
            })
          );
          return true;
        }
        return false;
      }),
      catchError(error => {
        const errorMsg = error.message;
        alert.openFromComponent(AlertComponent, {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          data: {
            title: 'API ERROR',
            message: errorMsg,
            type: 'ERROR',
          },
        });
        return of(errorMsg);
      })
    );
};
