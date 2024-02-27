export interface UserState {
  details: User;
}

export type User =
  | {
      _id: string;
      email: string | null | undefined;
      name: string;
      username: string;
      bio: string | null | undefined;
      profile:
        | {
            url: string;
            filename: string;
            createdAt: string;
            updatedAt: string;
          }
        | null
        | undefined;
      verified: boolean;
      createdAt: string;
      updatedAt: string;
    }
  | null
  | undefined;
