import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  template: `
    <mat-toolbar>
      <div class="z-index-1 cursor-pointer" routerLink="/landing-page">
        MyChat
      </div>
      <span class="spacer"></span>
      <div class="flex justify-between gap-2">
        <button
          type="button"
          mat-button
          routerLink="./register"
          color="success"
          div>
          Register
        </button>
        <button type="button" mat-button routerLink="./login" color="accent">
          Login
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: `
    :host {
      width: 100%;
    }
    .spacer {
      flex: 1 1 auto;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  evnet() {
    console.log('clicked');
  }
}
