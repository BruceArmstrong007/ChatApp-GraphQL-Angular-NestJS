import { ComponentFixture, TestBed } from '@angular/core/testing';

import VerifyAccountComponent from './verify-account.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloModule } from 'apollo-angular';
import { verifyAccountState } from './verify-account.state';
import { Store } from '@ngrx/store';
import { UrlParserService } from '../../service/url-parser.service';

describe('VerifyAccountComponent', () => {
  let component: VerifyAccountComponent;
  let fixture: ComponentFixture<VerifyAccountComponent>;
  beforeEach(async () => {
    const verifyAccountStateMock = jasmine.createSpyObj('MyService', [
      'someMethod',
    ]);

    const storeMock = jasmine.createSpyObj('MyService', ['selectSignal']);
    const UrlParserServiceMark = jasmine.createSpyObj('MyService', [
      'parseURL',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        VerifyAccountComponent,
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
        { provide: verifyAccountState, useValue: verifyAccountStateMock },
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

    fixture = TestBed.createComponent(VerifyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not send token request, if email is invalid', () => {
    const formValues = {
      email: 'examplecom',
      token: '',
    };

    component.form.patchValue(formValues);
    expect(component.form.controls.email.valid).toBeFalsy();
    spyOn(component.verifyAccountState, 'verificationLink');
    component.submit();

    expect(
      component.verifyAccountState.verificationLink
    ).not.toHaveBeenCalledWith(formValues);
  });

  it('should send token request, if email is valid', () => {
    const formValues = {
      email: 'example@google.com',
      token: '',
    };

    component.form.setValue(formValues);
    expect(component.form.controls.email.valid).toBeTruthy();

    spyOn(component.verifyAccountState, 'verificationLink');
    component.submit();

    expect(
      component.verifyAccountState.verificationLink
    ).not.toHaveBeenCalledWith(formValues);
  });

  it('should not submit the form if email is invalid', () => {
    const formValues = {
      email: 'examplecom',
      token: '3323',
    };

    component.form.setValue(formValues);
    expect(component.form.controls.email.valid).toBeFalsy();

    spyOn(component.verifyAccountState, 'verifyEmail');
    component.submit();

    expect(component.verifyAccountState.verifyEmail).not.toHaveBeenCalledWith(
      formValues
    );
  });

  it('should not submit the form if token is invalid', () => {
    const formValues = {
      email: 'example@agaasdas.com',
      token: '',
    };

    component.form.setValue(formValues);
    expect(component.form.controls.token.valid).toBeFalsy();

    spyOn(component.verifyAccountState, 'verifyEmail');
    component.submit();

    expect(component.verifyAccountState.verifyEmail).not.toHaveBeenCalledWith(
      formValues
    );
  });

  it('should not submit the form if token and email are invalid', () => {
    const formValues = {
      email: 'examplecom',
      token: '',
    };

    component.form.setValue(formValues);
    expect(component.form.valid).toBeFalsy();
    expect(component.form.controls.token.valid).toBeFalsy();
    expect(component.form.controls.email.valid).toBeFalsy();

    spyOn(component.verifyAccountState, 'verifyEmail');
    component.submit();

    expect(component.verifyAccountState.verifyEmail).not.toHaveBeenCalledWith(
      formValues
    );
  });

  it('should submit the form if form is valid', () => {
    const formValues = {
      email: 'example@google.com',
      token: '2324',
    };

    component.form.setValue(formValues);
    expect(component.form.valid).toBeTruthy();

    spyOn(component.verifyAccountState, 'verifyEmail');
    component.submit();

    expect(component.verifyAccountState.verifyEmail).toHaveBeenCalledWith(
      formValues
    );
  });
});
