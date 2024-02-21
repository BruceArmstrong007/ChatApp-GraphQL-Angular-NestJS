import { Component, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterGQL } from '../generated-types';
import { NgClass } from '@angular/common';
import { ThemeService } from './shared/services/theme.service';
import { BackgroundComponent } from './shared/components/background/background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, BackgroundComponent],
  template: `<div
    class="layout layoutSize"
    [ngClass]="{
      'dark-theme': theme.darkMode(),
      'light-theme': !theme.darkMode()
    }">
    <router-outlet />
    <app-background />
  </div> `,
  styles: `
    .layoutSize {
      width: 100%;
      height: 100dvh;
      position: relative;
    }
  `,
})
class AppComponent implements OnDestroy {
  readonly theme = inject(ThemeService);
  intervalID: any;
  constructor() {
    this.intervalID = setInterval(() => {
      this.theme.switchMode();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalID);
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
