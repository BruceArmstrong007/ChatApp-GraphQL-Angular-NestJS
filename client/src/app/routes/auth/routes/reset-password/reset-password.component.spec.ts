import { ComponentFixture, TestBed } from '@angular/core/testing';

import ResetPasswordComponent from './reset-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { ApolloModule } from 'apollo-angular';
import { UrlParserService } from '../../service/url-parser.service';
import { resetPasswordState } from './reset-password.state';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    const resetPasswordStateMock = jasmine.createSpyObj('MyService', [
      'someMethod',
    ]);

    const storeMock = jasmine.createSpyObj('MyService', ['selectSignal']);
    const UrlParserServiceMark = jasmine.createSpyObj('MyService', [
      'parseURL',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ResetPasswordComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        ApolloModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: UrlParserService, useValue: UrlParserServiceMark },
        { provide: resetPasswordState, useValue: resetPasswordStateMock },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {},
        },
        {
          provide: MatSnackBarRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not send token request, if email is invalid', () => {
    const formValues = {
      email: 'examplecom',
      password: '',
      confirmPassword: '',
      token: '',
    };

    component.form.patchValue(formValues);
    expect(component.form.controls.email.valid).toBeFalsy();
    spyOn(component.resetPasswordState, 'resetPasswordLink');
    component.submit();

    expect(
      component.resetPasswordState.resetPasswordLink
    ).not.toHaveBeenCalledWith(formValues);
  });

  it('should send token request, if email is valid', () => {
    const formValues = {
      email: 'example@google.com',
      password: '',
      confirmPassword: '',
      token: '',
    };

    component.form.setValue(formValues);
    expect(component.form.controls.email.valid).toBeTruthy();

    spyOn(component.resetPasswordState, 'resetPasswordLink');
    component.submit();

    expect(
      component.resetPasswordState.resetPasswordLink
    ).not.toHaveBeenCalledWith(formValues);
  });

  it('should not submit the form if email is invalid', () => {
    const formValues = {
      email: 'examplecom',
      password: 'asdasdasd22',
      confirmPassword: 'asdasdasd22',
      token: '3323',
    };

    component.form.setValue(formValues);
    expect(component.form.controls.email.valid).toBeFalsy();

    spyOn(component.resetPasswordState, 'resetPassword');
    component.submit();

    expect(component.resetPasswordState.resetPassword).not.toHaveBeenCalledWith(
      formValues
    );
  });

  it('should not submit the form if token is invalid', () => {
    const formValues = {
      email: 'example@agaasdas.com',
      password: 'asdasdasd22',
      confirmPassword: 'asdasdasd22',
      token: '',
    };

    component.form.setValue(formValues);
    expect(component.form.controls.token.valid).toBeFalsy();

    spyOn(component.resetPasswordState, 'resetPassword');
    component.submit();

    expect(component.resetPasswordState.resetPassword).not.toHaveBeenCalledWith(
      formValues
    );
  });

  it('should not submit the form if token and email are invalid', () => {
    const formValues = {
      email: 'examplecom',
      password: 'asdasdasd22',
      confirmPassword: 'asdasdasd22',
      token: '',
    };

    component.form.setValue(formValues);
    expect(component.form.valid).toBeFalsy();
    expect(component.form.controls.token.valid).toBeFalsy();
    expect(component.form.controls.email.valid).toBeFalsy();

    spyOn(component.resetPasswordState, 'resetPassword');
    component.submit();

    expect(component.resetPasswordState.resetPassword).not.toHaveBeenCalledWith(
      formValues
    );
  });

  it('should submit the form if form is valid', () => {
    const formValues = {
      email: 'example@google.com',
      password: 'asdasdasd22',
      confirmPassword: 'asdasdasd22',
      token: '2324',
    };

    component.form.setValue(formValues);
    expect(component.form.valid).toBeTruthy();

    spyOn(component.resetPasswordState, 'resetPassword');
    component.submit();

    expect(component.resetPasswordState.resetPassword).toHaveBeenCalledWith(
      formValues
    );
  });
});
