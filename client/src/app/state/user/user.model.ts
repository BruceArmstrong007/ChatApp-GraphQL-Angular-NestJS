export interface UserState {
  details: User;
}

export type User =
  | {
      _id: string | null | undefined;
      email: string | null | undefined;
      name: string;
      username: string;
      bio: string | null | undefined;
      dob: string | null | undefined;
      location: string | null | undefined;
      gender: string | null | undefined;
      age: number | null | undefined;
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


