import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { RefreshGQL, RefreshQuery } from '../../../generated-types';
import { authActions } from './auth.action';
import { ApolloQueryResult } from '@apollo/client/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../../shared/components/alert/alert.component';

export const refreshToken = createEffect(
  (actions$ = inject(Actions), refreshToken = inject(RefreshGQL)) => {
    return actions$.pipe(
      ofType(authActions.refreshToken),
      exhaustMap(() => {
        return refreshToken.fetch().pipe(
          map((response: ApolloQueryResult<RefreshQuery>) => {
            return authActions.setRefreshToken(response?.data?.refresh);
          }),
          catchError(() => {
            return of(authActions.refreshTokenFailure());
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const refreshTokenFailure = createEffect(
  (actions$ = inject(Actions), alert = inject(MatSnackBar)) => {
    return actions$.pipe(
      ofType(authActions.refreshTokenFailure),
      tap(() => {
        alert.openFromComponent(AlertComponent, {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          data: {
            title: 'API ERROR',
            message: 'Unauthorized',
            type: 'ERROR',
          },
        });
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);
