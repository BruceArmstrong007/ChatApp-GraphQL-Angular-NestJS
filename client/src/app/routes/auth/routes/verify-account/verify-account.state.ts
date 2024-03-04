import {
  EmailVerificationLinkGQL,
  EmailVerificationGQL,
  EmailVerificationLinkMutation,
  EmailVerificationMutation,
} from './../../../../../generated-types';
import { MutationResult } from 'apollo-angular';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  setLoaded,
  setLoading,
  withCallState,
} from '../../../../shared/state/api-call.state';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { VerificationLink, VerifyEmail } from './verify-account.types';

interface VerifyAccount {
  emailDisability: boolean;
  tokenApiLoading: boolean;
}

export const verifyAccountState = signalStore(
  withState<VerifyAccount>({
    emailDisability: false,
    tokenApiLoading: false,
  }),
  withCallState(),
  withMethods(state => {
    const verifyEmailLink = inject(EmailVerificationLinkGQL);
    const verifyEmail = inject(EmailVerificationGQL);
    const router = inject(Router);
    return {
      disableEmailField: () => patchState(state, { emailDisability: true }),
      verificationLink: rxMethod<VerificationLink>(c$ =>
        c$.pipe(
          tap(() => {
            patchState(state, { tokenApiLoading: true });
          }),
          switchMap(c =>
            verifyEmailLink
              .mutate(
                {
                  emailVerificationLinkData: c,
                },
                {
                  fetchPolicy: 'no-cache',
                }
              )
              .pipe(
                tap(
                  (response: MutationResult<EmailVerificationLinkMutation>) => {
                    patchState(state, { tokenApiLoading: false });
                    patchState(state, { emailDisability: true });
                    state.openAlert(
                      'Emailing Token Successful',
                      'Verification Token is sent to your email!.',
                      'SUCCESS'
                    );
                  }
                ),
                catchError(error => {
                  const errorMsg = error.message;
                  patchState(state, { tokenApiLoading: false });
                  state.openAlert('API Error', errorMsg, 'ERROR');
                  return of(errorMsg);
                })
              )
          )
        )
      ),
      verifyEmail: rxMethod<VerifyEmail>(c$ =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
          }),
          switchMap(c =>
            verifyEmail
              .mutate(
                {
                  emailVerificationData: c,
                },
                {
                  fetchPolicy: 'no-cache',
                }
              )
              .pipe(
                tap((response: MutationResult<EmailVerificationMutation>) => {
                  patchState(state, setLoaded());
                  state.openAlert(
                    'Verification Successful',
                    'Your email is verified!.',
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
