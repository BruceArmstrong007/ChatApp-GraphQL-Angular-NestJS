import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  setLoaded,
  setLoading,
  withCallState,
} from '../../../../shared/state/api-call.state';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  ResetPasswordGQL,
  ResetPasswordLinkGQL,
  ResetPasswordLinkMutation,
  ResetPasswordMutation,
} from '../../../../../generated-types';
import { catchError, of, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MutationResult } from 'apollo-angular';
import { ResetPassword, ResetPasswordLink } from './reset-password.types';

interface ResetPasswordState {
  emailDisability: boolean;
  emailApiLoading: boolean;
  isToken: boolean;
  passwordVisibility: boolean;
  confirmPasswordVisibility: boolean;
}

export const resetPasswordState = signalStore(
  withState<ResetPasswordState>({
    emailDisability: false,
    emailApiLoading: false,
    isToken: false,
    passwordVisibility: false,
    confirmPasswordVisibility: false,
  }),
  withCallState(),
  withMethods(state => {
    const resetPasswordLink = inject(ResetPasswordLinkGQL);
    const resetPassword = inject(ResetPasswordGQL);
    const router = inject(Router);
    return {
      togglePassword: () =>
        patchState(state, { passwordVisibility: !state.passwordVisibility() }),
      toggleConfirmPassword: () =>
        patchState(state, {
          confirmPasswordVisibility: !state.confirmPasswordVisibility(),
        }),
      disableEmailField: () =>
        patchState(state, {
          emailDisability: true,
        }),
      setToken: () =>
        patchState(state, {
          isToken: true,
        }),
      resetPasswordLink: rxMethod<ResetPasswordLink>(c$ =>
        c$.pipe(
          tap(() => {
            patchState(state, { emailApiLoading: true });
          }),
          switchMap(c =>
            resetPasswordLink
              .mutate(
                {
                  resetPasswordLinkData: c,
                },
                {
                  fetchPolicy: 'no-cache',
                }
              )
              .pipe(
                tap((response: MutationResult<ResetPasswordLinkMutation>) => {
                  patchState(state, setLoaded());
                  patchState(state, { emailApiLoading: false });
                  patchState(state, { emailDisability: true });
                  state.openAlert(
                    'Emailing Link Successful',
                    'Verification link is sent to your email!',
                    'SUCCESS'
                  );
                  setTimeout(() => {
                    state.openAlert(
                      'Redirecting..',
                      'Redirecting you to landing page in 3 seconds.',
                      'INFO'
                    );
                    setTimeout(() => router.navigate(['/landing-page']), 3000);
                  }, 1000);
                }),
                catchError(error => {
                  const errorMsg = error.message;
                  patchState(state, { emailApiLoading: false });
                  state.openAlert('API Error', errorMsg, 'ERROR');
                  return of(errorMsg);
                })
              )
          )
        )
      ),
      resetPassword: rxMethod<ResetPassword>(c$ =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
          }),
          switchMap(c =>
            resetPassword
              .mutate(
                {
                  resetPasswordData: c,
                },
                {
                  fetchPolicy: 'no-cache',
                }
              )
              .pipe(
                tap((response: MutationResult<ResetPasswordMutation>) => {
                  patchState(state, setLoaded());
                  state.openAlert(
                    'Reset Password Successful',
                    'Your password has been reset!.',
                    'SUCCESS'
                  );
                  router.navigate(['/auth']);
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
