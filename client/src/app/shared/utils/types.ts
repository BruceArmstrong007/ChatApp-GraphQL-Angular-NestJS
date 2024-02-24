export class User {
  _id: string;

  username: string;

  email: string;

  bio: string | null | undefined;

  name: string;

  profile: Profile;
}

export type Profile =
  | {
      url: string;
      filename: string;
    }
  | null
  | undefined;
