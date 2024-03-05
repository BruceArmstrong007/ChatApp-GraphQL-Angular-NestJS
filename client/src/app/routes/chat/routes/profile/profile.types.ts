import { FormControl } from '@angular/forms';

export interface ProfileForm {
  _id: FormControl<string>;
  username: FormControl<string | null>;
  name: FormControl<string | null>;
  bio: FormControl<string | null>;
  dob: FormControl<string | null>;
  location: FormControl<string | null>;
  gender: FormControl<string | null>;
  age: FormControl<number | null>;
}

export interface ProfileState {}

export interface Profile {
  _id: string;
  username: string | null;
  name: string | null;
  bio: string | null;
  dob: string | null;
  location: string | null;
  gender: string | null;
  age: number | null;
}

export interface UploadProfile {
  prevFilename: string;
  profile: File;
}

export interface ProfileResponse {
  message: string;
  filename: string;
  url: string;
}
