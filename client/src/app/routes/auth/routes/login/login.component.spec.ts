import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loginState } from './login.state';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import LoginComponent from './login.component';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { ApolloModule } from 'apollo-angular';
import { Store } from '@ngrx/store';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    const loginStateMock = jasmine.createSpyObj('MyService', ['someMethod']);
    const storeMock = jasmine.createSpyObj('MyService', ['someMethod']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        LoginComponent,
        MatSnackBarModule,
        ApolloModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: loginState, useValue: loginStateMock },
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit the form if username is invalid', () => {
    const formValues = {
      username: 'asf',
      password: 'testpasdasd22',
    };

    component.form.setValue(formValues);
    expect(component.form.valid).toBeFalsy();
    expect(component.form.controls.username.valid).toBeFalsy();
    expect(component.form.controls.password.valid).toBeTruthy();

    spyOn(component.loginState, 'login');
    component.submit();

    expect(component.loginState.login).not.toHaveBeenCalledWith(formValues);
  });

  it('should not submit the form if password is invalid', () => {
    const formValues = {
      username: 'testasdsad',
      password: 'testpas',
    };

    component.form.setValue(formValues);
    expect(component.form.valid).toBeFalsy();
    expect(component.form.controls.username.valid).toBeTruthy();
    expect(component.form.controls.password.valid).toBeFalsy();

    spyOn(component.loginState, 'login');
    component.submit();

    expect(component.loginState.login).not.toHaveBeenCalledWith(formValues);
  });

  it('should not submit the form if both username and password in the form are invalid', () => {
    const formValues = {
      username: 'sa',
      password: 'test',
    };

    component.form.setValue(formValues);
    expect(component.form.valid).toBeFalsy();
    expect(component.form.controls.username.valid).toBeFalsy();
    expect(component.form.controls.password.valid).toBeFalsy();

    spyOn(component.loginState, 'login');
    component.submit();

    expect(component.loginState.login).not.toHaveBeenCalledWith(formValues);
  });

  it('should submit the form if form is valid', () => {
    const formValues = {
      username: 'testuser',
      password: 'testpassword1',
    };

    component.form.setValue(formValues);
    expect(component.form.valid).toBeTrue();

    spyOn(component.loginState, 'login');
    component.submit();
    36;
    expect(component.loginState.login).toHaveBeenCalledWith(formValues);
  });

  it('should reset form on reset()', () => {
    const formValues = {
      username: 'testuser',
      password: 'testpassword1',
    };

    component.form.setValue(formValues);
    expect(component.form.valid).toBeTrue();

    component.reset();

    expect(component.form.value).toEqual({
      username: '',
      password: '',
    });
  });
});
