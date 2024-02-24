import { ComponentFixture, TestBed } from '@angular/core/testing';

import RegisterComponent from './register.component';
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
import { registerState } from './register.state';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    const registerStateMock = jasmine.createSpyObj('MyService', ['someMethod']);
    const storeMock = jasmine.createSpyObj('MyService', ['someMethod']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RegisterComponent,
        MatSnackBarModule,
        ApolloModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: registerState, useValue: registerStateMock },
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

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit the form if username is invalid', () => {
    const formValues = {
      username: 'user',
      email: 'example@google.com',
      password: 'testpaasdsa22',
      confirmPassword: 'testpaasdsa22',
    };

    component.form.setValue(formValues);
    expect(component.form.valid).toBeFalsy();
    expect(component.form.controls.username.valid).toBeFalsy();

    spyOn(component.registerState, 'register');
    component.submit();

    expect(component.registerState.register).not.toHaveBeenCalledWith(
      formValues
    );
  });

  it('should not submit the form if password is invalid', () => {
    const formValues = {
      username: 'testbrucearmstrong',
      email: 'example',
      password: 'test',
      confirmPassword: 'test',
    };

    component.form.setValue(formValues);
    expect(component.form.controls.password.valid).toBeFalsy();

    spyOn(component.registerState, 'register');
    component.submit();

    expect(component.registerState.register).not.toHaveBeenCalledWith(
      formValues
    );
  });

  it('should not submit the form passwords doesnot match', () => {
    const formValues = {
      username: 'testbrucearmstrong',
      email: 'example',
      password: 'asdasdasds2',
      confirmPassword: 'asdsadasdas22',
    };

    component.form.setValue(formValues);
    expect(component.form.controls.password.valid).not.toEqual(
      component.form.controls.confirmPassword.valid
    );

    spyOn(component.registerState, 'register');
    component.submit();

    expect(component.registerState.register).not.toHaveBeenCalledWith(
      formValues
    );
  });

  it('should not submit the form if email is invalid', () => {
    const formValues = {
      username: 'test',
      email: 'examplecom',
      password: 'tesasdasd22tpa',
      confirmPassword: 'tesasdasd22tpa',
    };

    component.form.setValue(formValues);
    expect(component.form.controls.email.valid).toBeFalsy();

    spyOn(component.registerState, 'register');
    component.submit();

    expect(component.registerState.register).not.toHaveBeenCalledWith(
      formValues
    );
  });

  it('should submit the form if form is valid', () => {
    const formValues = {
      username: 'testuser',
      email: 'example@google.com',
      password: 'testpaasdsa22',
      confirmPassword: 'testpaasdsa22',
    };

    component.form.setValue(formValues);
    expect(component.form.valid).toBeTrue();

    spyOn(component.registerState, 'register');
    component.submit();

    expect(component.registerState.register).toHaveBeenCalledWith(formValues);
  });

  it('should reset form on reset()', () => {
    const formValues = {
      username: 'testuser',
      email: 'example@google.com',
      password: 'testpaasdsa22',
      confirmPassword: 'testpaasdsa22',
    };

    component.form.setValue(formValues);
    expect(component.form.valid).toBeTrue();

    component.reset();

    expect(component.form.value).toEqual({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  });
});
