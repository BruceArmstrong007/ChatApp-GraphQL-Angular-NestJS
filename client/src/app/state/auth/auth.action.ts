import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AccessToken } from './auth.model';

export const authActions = createActionGroup({
  source: 'Auth Actions',
  events: {
    ResetState: emptyProps(),
    RefreshToken: emptyProps,
    SetRefreshToken: props<AccessToken>(),
    RefreshTokenFailure: emptyProps()
  },
});
