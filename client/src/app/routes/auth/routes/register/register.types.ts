import { FormControl } from '@angular/forms';

export interface Register {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface RegisterForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}
