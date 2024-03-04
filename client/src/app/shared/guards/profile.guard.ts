import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CurrentuserGQL, CurrentuserQuery } from '../../../generated-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, catchError, of } from 'rxjs';
import { AlertComponent } from '../components/alert/alert.component';
import { ApolloQueryResult } from '@apollo/client/core';
import { Store } from '@ngrx/store';
import { userActions } from '../../state/user/user.action';
import { User } from '../../state/user/user.model';

export const profileGuard: CanActivateFn = () => {
  const currentUser = inject(CurrentuserGQL);
  const store = inject(Store);
  const alert = inject(MatSnackBar);
  return currentUser
    .fetch(undefined, {
      fetchPolicy: 'no-cache',
    })
    .pipe(
      map((response: ApolloQueryResult<CurrentuserQuery>) => {
        if (response?.data?.currentUser) {
          const temp = response?.data?.currentUser;
          const user: User = {
            _id: temp._id,
            username: temp.username,
            email: temp.email,
            bio: temp.bio,
            name: temp.name,
            profile: temp.profile,
            age: temp.age,
            dob: temp.dob,
            location: temp.location,
            gender: temp.gender,
            verified: temp.verified,
            createdAt: temp.createdAt,
            updatedAt: temp.updatedAt,
          };
          store.dispatch(userActions.saveProfile(user));
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
