import {
  SendRequestInput,
  SendRequestGQL,
  SendRequestMutation,
  UsersGQL,
  UsersQuery,
} from './../../../../../generated-types';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  setLoaded,
  setLoading,
  withCallState,
} from '../../../../shared/state/api-call.state';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { inject } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { MutationResult } from 'apollo-angular';
import { AddFriendsState } from './add-friends.type';

export const addFriends = signalStore(
  withState<AddFriendsState>({
    users: [],
  }),
  withCallState(),
  withMethods(state => {
    const searchUsers = inject(UsersGQL);
    const sendRequest = inject(SendRequestGQL);
    return {
      errorAlert: (title: string, message: string) => {
        state.openAlert(title, message, 'ERROR');
      },
      emptyState: () => {
        patchState(state, { users: [] });
      },
      searchUsers: rxMethod<string>(c$ =>
        c$.pipe(
          debounceTime(600),
          distinctUntilChanged(),
          map((input: string) => {
            let type = 'name';
            if (input.charAt(0) == '@') {
              type = 'username';
              input = input.slice(1);
            }
            return {
              type,
              value: input,
            };
          }),
          tap(() => {
            patchState(state, setLoading());
          }),
          switchMap(c =>
            searchUsers
              .fetch(
                {
                  SearchUsersData: c,
                },
                {
                  fetchPolicy: 'no-cache',
                }
              )
              .pipe(
                tap((response: ApolloQueryResult<UsersQuery>) => {
                  patchState(state, setLoaded());
                  patchState(state, { users: response.data.users });
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
      sendRequest: rxMethod<SendRequestInput>(c$ =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
          }),
          switchMap(c =>
            sendRequest
              .mutate(
                {
                  sendRequestData: c,
                },
                {
                  fetchPolicy: 'no-cache',
                }
              )
              .pipe(
                tap((response: MutationResult<SendRequestMutation>) => {
                  patchState(state, setLoaded());

                  state.openAlert(
                    'Successfully sent',
                    'Friend request have been sent successfully.',
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
