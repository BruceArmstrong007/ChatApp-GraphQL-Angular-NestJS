export class User {
  _id: string;

  username: string;

  email: string;

  password: string;

  bio: string;

  name: string;

  profile: Profile;

  verified: boolean;
}

export class Profile {
  url: string;

  filename: string;
}
