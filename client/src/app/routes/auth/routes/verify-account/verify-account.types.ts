import { FormControl } from '@angular/forms';

export interface VerificationLink {
  email: string;
}

export interface VerifyEmail {
  email: string;
  token: string;
}

export interface VerifyAccountForm {
  email: FormControl<string>;
  token: FormControl<string>;
}

export interface VerifyAccount {
  email: string;
  token: string;
}
