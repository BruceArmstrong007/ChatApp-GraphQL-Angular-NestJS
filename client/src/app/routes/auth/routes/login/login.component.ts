import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { loginState } from './login.state';
import { Login, LoginForm } from './login.types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
  ],
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="submit()"
      class="form-container flex-center justify-center">
      <mat-card class="card">
        <mat-card-header>
          <mat-card-title>Login Form</mat-card-title>
          <mat-card-subtitle>Please Enter your credentials</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="card-content">
          <mat-form-field>
            <mat-label>Username</mat-label>
            <input
              type="text"
              matInput
              formControlName="username"
              placeholder="Enter your username" />
            @if (usernameControl.hasError('required')) {
              <mat-error>Username is <strong>required</strong></mat-error>
            }
            <mat-icon matSuffix fontIcon="email" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Password</mat-label>
            <input
              [type]="loginState.passwordVisibility() ? 'text' : 'password'"
              matInput
              formControlName="password"
              placeholder="Enter your password" />
            @if (
              passwordControl.hasError('pattern') &&
              !passwordControl.hasError('required')
            ) {
              <mat-error>Please enter a valid password</mat-error>
            }
            @if (passwordControl.hasError('required')) {
              <mat-error>Password is <strong>required</strong></mat-error>
            }
            @if (passwordControl.hasError('minlength')) {
              <mat-error
                >Password should have atleast
                <strong
                  >{{
                    passwordControl.getError('minlength').requiredLength
                  }}
                  characters</strong
                ></mat-error
              >
            }
            <mat-icon
              (click)="loginState.togglePassword()"
              matSuffix
              [fontIcon]="
                loginState.passwordVisibility()
                  ? 'visibility'
                  : 'visibility_off'
              " />
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions class="flex-center justify-between">
          <button
            type="button"
            (click)="reset()"
            mat-button
            class="button-warn">
            Reset
          </button>
          <button type="submit" mat-raised-button class="button-success">
            Login
          </button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
  styles: `
    .card-content {
      display: flex;
      gap: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
    }
    .flex-center {
      display: flex;
      align-items: center;
    }
    .justify-between {
      justify-content: space-between;
    }
    .justify-center {
      justify-content: center;
    }
    .card {
      width: 500px;
    }
    .form-container {
      width: 100%;
      height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [loginState],
})
class LoginComponent {
  readonly loginState = inject(loginState);
  readonly form = new FormGroup<LoginForm>({
    username: new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ]),
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^[A-Za-z][A-Za-z\d]*\d[A-Za-z\d]*$/),
      ]),
      nonNullable: true,
    }),
  });

  get usernameControl() {
    return this.form.controls.username;
  }

  get passwordControl() {
    return this.form.controls.password;
  }

  submit() {
    if (this.form.invalid) return;
    console.log(this.form.value);
    this.loginState.login(this.form.value as Login);
  }

  reset() {
    this.form.reset();
  }
}
export default LoginComponent;
