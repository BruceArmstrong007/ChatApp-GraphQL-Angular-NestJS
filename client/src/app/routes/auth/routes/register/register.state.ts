import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  setLoaded,
  setLoading,
  withCallState,
} from '../../../../shared/state/api-call.state';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { RegisterGQL, RegisterMutation } from '../../../../../generated-types';
import { catchError, of, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from './register.types';
import { MutationResult } from 'apollo-angular';

interface RegisterState {
  passwordVisibility: boolean;
  confirmPasswordVisibility: boolean;
}

export const registerState = signalStore(
  withState<RegisterState>({
    passwordVisibility: false,
    confirmPasswordVisibility: false,
  }),
  withCallState(),
  withMethods(state => {
    const register = inject(RegisterGQL);
    const router = inject(Router);
    return {
      togglePassword: () =>
        patchState(state, { passwordVisibility: !state.passwordVisibility() }),
      toggleConfirmPassword: () =>
        patchState(state, {
          confirmPasswordVisibility: !state.confirmPasswordVisibility(),
        }),
      register: rxMethod<Register>(c$ =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
          }),
          switchMap(c =>
            register
              .mutate(
                {
                  createUserData: c,
                },
                {
                  fetchPolicy: 'no-cache',
                }
              )
              .pipe(
                tap((response: MutationResult<RegisterMutation>) => {
                  patchState(state, setLoaded());
                  const encoded = btoa(
                    JSON.stringify({ email: c.email, token: null })
                  );
                  state.openAlert(
                    'Registeration Successful',
                    'Please verify your email account!.',
                    'SUCCESS'
                  );
                  router.navigateByUrl(`/auth/verify-account?token=${encoded}`);
                  state.openAlert(
                    'Registration Successful',
                    'Successfully Registered!.',
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
