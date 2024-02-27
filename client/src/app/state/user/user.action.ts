import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './user.model';

type NonNullableUser = NonNullable<User>;

export const userActions = createActionGroup({
  source: 'User Actions',
  events: {
    ResetState: emptyProps(),
    saveProfile: props<User>(),
    Logout: emptyProps(),
    LogoutSuccess: emptyProps(),
    LogoutFailure: emptyProps(),
    UpdateUser: props<{
      request: Pick<NonNullableUser, 'name' | 'bio' | 'username'>;
    }>(),
    UpdateUserSuccess: emptyProps(),
    UpdateUserFailure: emptyProps(),
  },
});
