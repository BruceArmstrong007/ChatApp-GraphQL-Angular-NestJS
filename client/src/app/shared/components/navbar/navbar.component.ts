import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  template: `
    <mat-toolbar>
      <div class="flex justify-between gap-2">
        <div class="cursor-pointer" routerLink="/landing-page">MyChat</div>
        <ng-content select="left" />
      </div>
      <span class="spacer"></span>
      <div class="flex justify-between gap-2">
        <ng-content select="right" />
        <button type="button" mat-icon-button (click)="theme.switchMode()">
          <mat-icon>{{
            theme.darkMode() ? 'light_mode' : 'dark_mode'
          }}</mat-icon>
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
  readonly theme = inject(ThemeService);
}
