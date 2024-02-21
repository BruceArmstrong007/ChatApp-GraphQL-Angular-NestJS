import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  setLoaded,
  setLoading,
  withCallState,
} from '../../../../shared/state/api-call.state';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { LoginGQL, LoginQuery } from '../../../../../generated-types';
import { catchError, of, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { AccessToken, Login } from './login.types';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../../../state/auth/auth.action';
import { ApolloQueryResult } from '@apollo/client/core';

interface LoginState {
  passwordVisibility: boolean;
}

export const loginState = signalStore(
  withState<LoginState>({
    passwordVisibility: false,
  }),
  withCallState(),
  withMethods(state => {
    const login = inject(LoginGQL);
    const router = inject(Router);
    const store = inject(Store);
    return {
      togglePassword: () =>
        patchState(state, { passwordVisibility: !state.passwordVisibility() }),
      login: rxMethod<Login>(c$ =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
          }),
          switchMap(c =>
            login
              .fetch({
                LoginAuthData: c,
              })
              .pipe(
                tap((response: ApolloQueryResult<LoginQuery>) => {
                  patchState(state, setLoaded());
                  const token: AccessToken = {
                    accessToken: response.data.login.accessToken,
                  };
                  localStorage.setItem('isLoggedIn', 'true');
                  store.dispatch(authActions.setToken(token));
                  router.navigate(['/']);
                  state.openAlert(
                    'Login Successful',
                    'Successfully logged in!.',
                    'SUCCESS'
                  );
                }),
                catchError(error => {
                  const errorMsg = error.message;
                  state.setError(errorMsg);
                  state.openAlert('API Error', errorMsg, 'ERROR');
                  return of(errorMsg);
                })
              )
          )
        )
      ),
    };
  })
);
