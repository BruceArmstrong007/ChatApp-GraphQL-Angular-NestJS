import { FormControl } from '@angular/forms';
export interface ResetPassword {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
}

export interface ResetPasswordLink {
  email: string;
}

export interface ResetPasswordForm {
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  token: FormControl<string>;
}
