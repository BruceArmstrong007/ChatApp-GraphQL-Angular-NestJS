import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { registerState } from './register.state';
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Register, RegisterForm } from './register.types';
import { CustomValidationService } from '../../../../shared/services/validator/custom-validation.service';

@Component({
  selector: 'app-register',
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
    RouterLink,
  ],
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="submit()"
      class="form-container flex justify-center">
      <mat-card class="card">
        <mat-card-header>
          <mat-card-title>Register Form</mat-card-title>
          <mat-card-subtitle>Please enter your credentials</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="flex card-content">
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
            @if (usernameControl.hasError('minlength')) {
              <mat-error
                >Username should have atleast
                <strong
                  >{{
                    usernameControl.getError('minlength').requiredLength
                  }}
                  characters</strong
                ></mat-error
              >
            }
            <mat-icon matSuffix fontIcon="face" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Email</mat-label>
            <input
              type="text"
              matInput
              formControlName="email"
              placeholder="Enter your email" />
            @if (
              emailControl.hasError('pattern') &&
              !emailControl.hasError('required')
            ) {
              <mat-error>Please enter a valid email</mat-error>
            }
            @if (emailControl.hasError('required')) {
              <mat-error>Email is <strong>required</strong></mat-error>
            }
            @if (emailControl.hasError('email')) {
              <mat-error>Please enter valid email</mat-error>
            }
            <mat-icon matSuffix fontIcon="email" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Password</mat-label>
            <input
              [type]="registerState.passwordVisibility() ? 'text' : 'password'"
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
              (click)="registerState.togglePassword()"
              matSuffix
              [fontIcon]="
                registerState.passwordVisibility()
                  ? 'visibility'
                  : 'visibility_off'
              " />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Confirm Password</mat-label>
            <input
              [type]="
                registerState.confirmPasswordVisibility() ? 'text' : 'password'
              "
              matInput
              formControlName="confirmPassword"
              placeholder="Enter your password" />
            @if (
              confirmPasswordControl.hasError('pattern') &&
              !confirmPasswordControl.hasError('required')
            ) {
              <mat-error>Please enter a valid confirm password</mat-error>
            }
            @if (confirmPasswordControl.hasError('required')) {
              <mat-error
                >Confirm Password is <strong>required</strong></mat-error
              >
            }
            @if (confirmPasswordControl.hasError('minlength')) {
              <mat-error
                >Confirm Password should have atleast
                <strong
                  >{{
                    confirmPasswordControl.getError('minlength').requiredLength
                  }}
                  characters</strong
                ></mat-error
              >
            }
            @if (confirmPasswordControl.hasError('mismatch')) {
              <mat-error
                >Both Password should be <strong>same</strong></mat-error
              >
            }
            <mat-icon
              (click)="registerState.toggleConfirmPassword()"
              matSuffix
              [fontIcon]="
                registerState.confirmPasswordVisibility()
                  ? 'visibility'
                  : 'visibility_off'
              " />
          </mat-form-field>
          <sub>
            Not Verified your account ?
            <a [routerLink]="['../verify-account']"> Click here</a>
          </sub>
        </mat-card-content>
        <mat-card-actions class="flex justify-between">
          <button type="button" (click)="reset()" mat-button color="warn">
            Reset
          </button>
          <button type="submit" mat-raised-button>Register</button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
  styles: `
    .card-content {
      flex-direction: column;
      gap: 1;
      justify-content: center;
      padding: 20px 0;
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
  providers: [registerState],
})
class RegisterComponent {
  readonly registerState = inject(registerState);
  private readonly passwordValidator = inject(CustomValidationService);
  readonly form = new FormGroup<RegisterForm>(
    {
      username: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(8),
        ]),
        nonNullable: true,
      }),
      email: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
          ),
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
      confirmPassword: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^[A-Za-z][A-Za-z\d]*\d[A-Za-z\d]*$/),
        ]),
        nonNullable: true,
      }),
    },
    this.passwordValidator.MatchValidator('password', 'confirmPassword')
  );

  get usernameControl() {
    return this.form.controls.username;
  }

  get emailControl() {
    return this.form.controls.email;
  }

  get passwordControl() {
    return this.form.controls.password;
  }

  get confirmPasswordControl() {
    return this.form.controls.confirmPassword;
  }

  submit() {
    if (this.form.invalid) return;
    this.registerState.register(this.form.value as Register);
  }

  reset() {
    this.form.reset();
  }
}
export default RegisterComponent;
