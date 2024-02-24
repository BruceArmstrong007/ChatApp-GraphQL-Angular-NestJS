import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatButtonModule, RouterLink, RouterOutlet, NavbarComponent],
  template: `
    <div class="flex flex-column h-full">
      <app-navbar>
        <button
          type="button"
          mat-button
          routerLink="./register"
          color="success">
          Register
        </button>
        <button type="button" mat-button routerLink="./login" color="accent">
          Login
        </button>
      </app-navbar>
      <div class="flex justify-center flex-grow">
        <router-outlet />
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AuthComponent {}
export default AuthComponent;
