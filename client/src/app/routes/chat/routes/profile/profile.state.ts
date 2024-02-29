import {
  UpdateUserGQL,
  UpdateUserMutation,
} from './../../../../../generated-types';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  setLoaded,
  setLoading,
  withCallState,
} from '../../../../shared/state/api-call.state';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Profile, ProfileState } from './profile.types';
import { MutationResult } from 'apollo-angular';
import { userActions } from '../../../../state/user/user.action';
import { User } from '../../../../state/user/user.model';

export const profileState = signalStore(
  withState<ProfileState>({}),
  withCallState(),
  withMethods(state => {
    const updateUser = inject(UpdateUserGQL);
    const store = inject(Store);
    return {
      errorAlert: (title: string, message: string) => {
        state.openAlert(title, message, 'ERROR');
      },
      updateUser: rxMethod<Profile>(c$ =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
          }),
          switchMap(c =>
            updateUser
              .mutate({
                updateUserData: c,
              })
              .pipe(
                tap((response: MutationResult<UpdateUserMutation>) => {
                  patchState(state, setLoaded());
                  const temp = response.data?.updateUser;
                  if (!temp) return;
                  delete temp['__typename'];
                  store.dispatch(
                    userActions.updateUserSuccess({
                      response: temp as User,
                    })
                  );

                  state.openAlert(
                    'Update Successful',
                    'Successfully updated user details!.',
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
