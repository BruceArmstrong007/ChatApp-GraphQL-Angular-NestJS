import {
  ChangeDetectionStrategy,
  Component,
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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { verifyAccountState } from './verify-account.state';
import { VerifyAccount, VerifyAccountForm } from './verify-account.types';
import { UrlParserService } from '../../service/url-parser.service';

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
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
          <mat-card-title>Verify Account Form</mat-card-title>
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
            <mat-icon matSuffix fontIcon="email" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Token</mat-label>
            <input
              type="text"
              matInput
              formControlName="token"
              placeholder="Enter your token" />
            @if (tokenControl.hasError('required')) {
              <mat-error>Token is <strong>required</strong></mat-error>
            }
            <button
              [disabled]="verifyAccountState.tokenApiLoading()"
              matSuffix
              type="button"
              (click)="sendToken()"
              mat-button>
              Send Token
            </button>
          </mat-form-field>
          <sub>
            Verified token ?
            <a [routerLink]="['../login']"> Click here to login your account</a>
          </sub>
        </mat-card-content>
        <mat-card-actions class="flex justify-end">
          <button
            [disabled]="
              verifyAccountState.loading() ||
              !verifyAccountState.emailDisability()
            "
            type="submit"
            mat-raised-button
            class="button-success">
            Verify Account
          </button>
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
  providers: [verifyAccountState],
})
class VerifyAccountComponent {
  readonly verifyAccountState = inject(verifyAccountState);
  readonly form = new FormGroup<VerifyAccountForm>({
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
    token: new FormControl('', {
      validators: Validators.compose([Validators.required]),
      nonNullable: true,
    }),
  });
  private readonly urlParser = inject(UrlParserService);

  constructor() {
    // router Store selection
    const parsedData = this.urlParser.parseURL();
    if (parsedData) {
      this.form.patchValue({ ...JSON.parse(atob(parsedData)) });
      this.verifyAccountState.disableEmailField();
    }

    // disabled state is set from store to reactive forms
    effect(() => {
      if (this.verifyAccountState.emailDisability()) {
        this.form.get('email')?.disable();
        this.form.get('token')?.enable();
      } else {
        this.form.get('email')?.enable();
        this.form.get('token')?.disable();
      }
    });
  }

  get emailControl() {
    return this.form.controls.email;
  }

  get tokenControl() {
    return this.form.controls.token;
  }

  submit() {
    if (this.form.invalid || !this.form.controls.token.getRawValue()) return;
    this.verifyAccountState.verifyEmail(
      this.form.getRawValue() as VerifyAccount
    );
  }

  sendToken() {
    const email = this.form.controls.email;
    if (email.valid) {
      this.verifyAccountState.verificationLink({ email: email.value });
    }
  }
}
export default VerifyAccountComponent;
