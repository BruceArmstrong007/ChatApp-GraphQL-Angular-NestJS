import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { UserState } from './user.model';
import { userActions } from './user.action';

const initialState: UserState = {
  details: null,
};

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(userActions.updateUser, (state): UserState => ({ ...state })),
    on(
      userActions.saveProfile,
      (state, action): UserState => ({
        ...state,
        details: action,
      })
    ),
    on(
      userActions.updateUserFailure,
      userActions.updateUserSuccess,
      userActions.updateUserFailure,
      (state): UserState => ({ ...state })
    ),
    on(
      userActions.resetState,
      (state): UserState => ({
        ...state,
        ...initialState,
      })
    )
  ),
  extraSelectors: ({ selectUserState }) => ({
    userProfile: createSelector(
      selectUserState,
      select => select.details?.profile
    ),
  }),
});
