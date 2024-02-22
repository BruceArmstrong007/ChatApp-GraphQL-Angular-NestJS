import { Component, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { ThemeService } from './shared/services/theme/theme.service';
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
    <app-background />
    <router-outlet />
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
}

export default AppComponent;
