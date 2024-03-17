import { User } from '../../../../shared/utils/types';

export interface FriendsResponse {
  message: string;
}

export interface FriendsState {
  friends: Partial<User>[];
}

