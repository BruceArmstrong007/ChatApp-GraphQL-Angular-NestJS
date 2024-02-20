import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterGQL } from '../generated-types';
import { NgClass } from '@angular/common';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  template: `<div
    class="layoutSize"
    [ngClass]="{
      'dark-theme': theme.darkMode(),
      'light-theme': !theme.darkMode()
    }"
  >
    <router-outlet />
  </div> `,
  styles: `
  .layoutSize{
    width: 100%;
    height: 100dvh;
  }
  `,
})
class AppComponent {
  readonly theme = inject(ThemeService);

  constructor() {
    setInterval(() => {
      this.theme.switchMode();
    }, 2000)
  }

  // constructor(private readonly registerUser: RegisterGQL) {}
  // register() {
  //   this.registerUser
  //     .mutate({
  //       createUserData: {
  //         username: 'demo1',
  //         email: 'demo1@example.com',
  //         password: 'ssssssss22',
  //         confirmPassword: 'ssssssss22',
  //       },
  //     })
  //     .subscribe(() => {});
  // }
}

export default AppComponent;
