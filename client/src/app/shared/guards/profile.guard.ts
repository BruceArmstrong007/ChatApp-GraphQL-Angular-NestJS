import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserGQL, UserQuery } from '../../../generated-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, catchError, of } from 'rxjs';
import { AlertComponent } from '../components/alert/alert.component';
import { ApolloQueryResult } from '@apollo/client/core';
import { Store } from '@ngrx/store';
import { userActions } from '../../state/user/user.action';
import { User } from '../utils/types';

export const profileGuard: CanActivateFn = () => {
  const profile = inject(UserGQL);
  const store = inject(Store);
  const alert = inject(MatSnackBar);
  return profile
    .fetch({
      FindUserData: {
        type: '_id',
        value: '65c318f27676fedc7c78bcf6',
      },
    })
    .pipe(
      map((response: ApolloQueryResult<UserQuery>) => {
        if (response?.data?.user) {
          const temp = response?.data?.user;
          const user: User = {
            _id: temp._id,
            username: temp.username,
            email: temp.email,
            bio: temp.bio,
            name: temp.name,
            profile: temp.profile,
          };
          store.dispatch(userActions.saveProfile({ user }));
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
