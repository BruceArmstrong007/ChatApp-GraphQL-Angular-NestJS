import { User } from '../../../../shared/utils/types';

export interface AddFriendsResponse {
  message: string;
}

export interface SearchUsers {
  type: 'name' | 'username';
  value: string;
}

export interface AddFriendsState {
  users: Partial<User>[];
}

