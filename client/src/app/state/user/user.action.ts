import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './user.model';

export const userActions = createActionGroup({
  source: 'User Actions',
  events: {
    ResetState: emptyProps(),
    saveProfile: props<User>(),
    Logout: emptyProps(),
    LogoutSuccess: emptyProps(),
    LogoutFailure: emptyProps(),
    UpdateUser: props<{
      request: Pick<User, 'name' | 'bio' | 'username'>;
    }>(),
    UpdateUserSuccess: emptyProps(),
    UpdateUserFailure: emptyProps(),
  },
});