import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { LogoutGQL, LogoutQuery } from '../../../generated-types';
import { ApolloQueryResult } from '@apollo/client/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { userActions } from './user.action';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../auth/auth.action';

export const logout = createEffect(
  (
    actions$ = inject(Actions),
    logout = inject(LogoutGQL),
    alert = inject(MatSnackBar)
  ) => {
    return actions$.pipe(
      ofType(userActions.logout),
      exhaustMap(() => {
        return logout
          .fetch(undefined, {
            fetchPolicy: 'no-cache',
          })
          .pipe(
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

export const logoutSuccess = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(userActions.logoutSuccess),
      tap(() => {
        localStorage.removeItem('isLoggedIn');
        store.dispatch(userActions.resetState());
        store.dispatch(authActions.resetState());
        router.navigateByUrl('/landing-page');
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);
