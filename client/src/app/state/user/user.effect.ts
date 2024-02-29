import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { LogoutGQL, LogoutQuery } from '../../../generated-types';
import { ApolloQueryResult } from '@apollo/client/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { userActions } from './user.action';

export const logout = createEffect(
  (
    actions$ = inject(Actions),
    logout = inject(LogoutGQL),
    alert = inject(MatSnackBar)
  ) => {
    return actions$.pipe(
      ofType(userActions.logout),
      exhaustMap(() => {
        return logout.fetch().pipe(
          map((response: ApolloQueryResult<LogoutQuery>) => {
            alert.openFromComponent(AlertComponent, {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              data: {
                title: 'Logged out',
                message: 'Successfully logged out.',
                type: 'SUCCESS',
              },
            });
            return userActions.logoutSuccess();
          }),
          catchError(() => {
            alert.openFromComponent(AlertComponent, {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              data: {
                title: 'API Error',
                message: 'Error while logging out.',
                type: 'ERROR',
              },
            });
            return of(userActions.logoutSuccess());
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);
