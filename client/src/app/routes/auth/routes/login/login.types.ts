import { FormControl } from '@angular/forms';

export interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

export interface Login {
  username: string;
  password: string;
}

export interface AccessToken {
  accessToken: string;
}
