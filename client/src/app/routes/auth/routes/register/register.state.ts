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
import { Store } from '@ngrx/store';
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
    const store = inject(Store);
    return {
      togglePassword: () =>
        patchState(state, { passwordVisibility: !state.passwordVisibility() }),
      toggleConfirmPassword: () =>
        patchState(state, {
          confirmPasswordVisibility: !state.confirmPasswordVisibility(),
        }),
      registerGlobalCache: rxMethod<Register>(c$ =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
          }),
          switchMap(c =>
            register
              .mutate({
                createUserData: c,
              })
              .pipe(
                tap((response: MutationResult<RegisterMutation>) => {
                  patchState(state, setLoaded());
                  router.navigate(['/']);
                  state.openAlert(
                    'Registeration Successful',
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
