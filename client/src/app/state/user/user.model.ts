export interface UserState {
  details: User;
}

export type User =
  | {
      _id: string;
      name: string;
      username: string;
      bio: string;
      profile: {
        url: string;
        filename: string;
      };
      verified: boolean;
      createdAt: string;
      updatedAt: string;
    }
  | null
  | undefined;
