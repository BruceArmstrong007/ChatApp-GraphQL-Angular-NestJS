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
import { FriendsState } from './friends.type';

export const friendsState = signalStore(
  withState<FriendsState>({
    friends: [],
  }),
  withCallState(),
  withMethods(state => {
    // const searchUsers = inject(UsersGQL);
    // const sendRequest = inject(SendRequestGQL);
    return {
      errorAlert: (title: string, message: string) => {
        state.openAlert(title, message, 'ERROR');
      },
      emptyState: () => {
        patchState(state, { friends: [] });
      },
      // sendRequest: rxMethod<SendRequestInput>(c$ =>
      //   c$.pipe(
      //     tap(() => {
      //       patchState(state, setLoading());
      //     }),
      //     switchMap(c =>
      //       sendRequest
      //         .mutate(
      //           {
      //             sendRequestData: c,
      //           },
      //           {
      //             fetchPolicy: 'no-cache',
      //           }
      //         )
      //         .pipe(
      //           tap((response: MutationResult<SendRequestMutation>) => {
      //             patchState(state, setLoaded());

      //             state.openAlert(
      //               'Successfully sent',
      //               'Friend request have been sent successfully.',
      //               'SUCCESS'
      //             );
      //           }),
      //           catchError(error => {
      //             const errorMsg = error.message;
      //             state.setError(errorMsg);
      //             state.openAlert('API Error', errorMsg, 'ERROR');
      //             return of(errorMsg);
      //           })
      //         )
      //     )
      //   )
      // ),
    };
  })
);
