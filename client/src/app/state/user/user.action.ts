import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './user.model';
import { ProfileResponse } from '../../routes/chat/routes/profile/profile.types';

export const userActions = createActionGroup({
  source: 'User Actions',
  events: {
    ResetState: emptyProps(),
    saveProfile: props<User>(),
    Logout: emptyProps(),
    LogoutSuccess: emptyProps(),
    LogoutFailure: emptyProps(),
    UpdateUser: props<Partial<User>>(),
    UpdateUserSuccess: props<{ response: User }>(),
    UpdateUserFailure: emptyProps(),
    UpdateProfile: props<Pick<ProfileResponse, 'filename' | 'url'>>(),
  },
});
