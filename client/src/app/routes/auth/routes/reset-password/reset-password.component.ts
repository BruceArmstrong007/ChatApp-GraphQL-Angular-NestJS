import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  effect,
  inject,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Params, RouterLink } from '@angular/router';
import { CustomValidationService } from '../../../../shared/services/validator/custom-validation.service';
import { resetPasswordState } from './reset-password.state';
import { ResetPassword, ResetPasswordForm } from './reset-password.types';
import { selectQueryParams } from '../../../../state/router/router-selector';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reset-password',
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
    NgIf,
  ],
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="submit()"
      class="form-container flex justify-center">
      <mat-card class="card">
        <mat-card-header>
          <mat-card-title>Reset Password Form</mat-card-title>
          <mat-card-subtitle>Please enter your credentials</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="flex card-content">
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
            <button
              [disabled]="resetPasswordState.emailApiLoading()"
              matSuffix
              type="button"
              (click)="sendToken()"
              mat-button>
              Send Token
            </button>
          </mat-form-field>
          @if (resetPasswordState.isToken()) {
            <mat-form-field>
              <mat-label>Password</mat-label>
              <input
                [type]="
                  resetPasswordState.passwordVisibility() ? 'text' : 'password'
                "
                (cut)="preventDefault($event)"
                (copy)="preventDefault($event)"
                (paste)="preventDefault($event)"
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
                (click)="resetPasswordState.togglePassword()"
                matSuffix
                [fontIcon]="
                  resetPasswordState.passwordVisibility()
                    ? 'visibility'
                    : 'visibility_off'
                " />
            </mat-form-field>
            <mat-form-field>
              <mat-label>Confirm Password</mat-label>
              <input
                (cut)="preventDefault($event)"
                (copy)="preventDefault($event)"
                (paste)="preventDefault($event)"
                [type]="
                  resetPasswordState.confirmPasswordVisibility()
                    ? 'text'
                    : 'password'
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
                      confirmPasswordControl.getError('minlength')
                        .requiredLength
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
                (click)="resetPasswordState.toggleConfirmPassword()"
                matSuffix
                [fontIcon]="
                  resetPasswordState.confirmPasswordVisibility()
                    ? 'visibility'
                    : 'visibility_off'
                " />
            </mat-form-field>
          }
          <sub>
            Know your password ?
            <a [routerLink]="['../login']"> Click here to login.</a>
          </sub>
        </mat-card-content>
        @if (resetPasswordState.isToken()) {
          <mat-card-actions class="flex justify-end">
            <button
              [disabled]="
                resetPasswordState.loading() ||
                !resetPasswordState.emailDisability()
              "
              type="submit"
              mat-raised-button>
              Reset Password
            </button>
          </mat-card-actions>
        }
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
  providers: [resetPasswordState],
})
class ResetPasswordComponent {
  readonly resetPasswordState = inject(resetPasswordState);
  readonly store = inject(Store);
  private readonly passwordValidator = inject(CustomValidationService);
  readonly form = new FormGroup<ResetPasswordForm>(
    {
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
      token: new FormControl('', {
        validators: Validators.compose([Validators.required]),
        nonNullable: true,
      }),
    },
    this.passwordValidator.MatchValidator('password', 'confirmPassword')
  );

  constructor() {
    // router Store selection
    const param: Signal<Params> = this.store.selectSignal(selectQueryParams);
    if (param()['token']) {
      this.form.patchValue({ ...JSON.parse(atob(param()['token'])) });
      this.resetPasswordState.disableEmailField();
      this.resetPasswordState.setToken();
    }

    // disabled state is set from store to reactive forms
    effect(() => {
      if (this.resetPasswordState.emailDisability()) {
        this.form.get('email')?.disable();
      } else {
        this.form.get('email')?.enable();
      }
    });
  }

  get tokenControl() {
    return this.form.controls.token;
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

  preventDefault(event: Event) {
    event.preventDefault();
  }

  submit() {
    if (this.form.invalid) return;
    this.resetPasswordState.resetPassword(
      this.form.getRawValue() as ResetPassword
    );
  }

  sendToken() {
    const email = this.form.controls.email;
    if (email.valid) {
      this.resetPasswordState.resetPasswordLink({ email: email.value });
    }
  }

  reset() {
    this.form.reset();
  }
}
export default ResetPasswordComponent;
