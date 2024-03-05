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
      userActions.updateUserSuccess,
      (state, action): UserState => ({
        ...state,
        details: action.response,
      })
    ),
    on(
      userActions.updateProfile,
      (state, action): UserState => ({
        ...state,
        details: state.details
          ? {
              ...state.details,
              ...updateProfile(state, action),
            }
          : null,
      })
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

function updateProfile(state: UserState, action: any) {
  if (state.details?.profile) {
    return {
      profile: {
        ...state.details?.profile,
        filename: action.filename,
        url: action.url,
      },
    };
  } else {
    return [];
  }
}
