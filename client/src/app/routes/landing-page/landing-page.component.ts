import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  template: `
    <div class="flex container justify-center">
      <div>
        <h3 class="app-title">My Chat</h3>
        <p class="app-description">Connect with people around the world!</p>
        <div class="flex justify-between">
          <button
            routerLink="../auth/login"
            type="button"
            mat-raised-button
            class="button-error">
            Login
          </button>
          <button
            routerLink="../auth/register"
            type="button"
            mat-raised-button
            class="button-primary">
            Register
          </button>
        </div>
      </div>
      <img src="./assets/landing-page.svg" alt="Chat" class="image" />
    </div>
  `,
  styles: `
    .container {
      width: 100%;
      height: 100%;
    }
    .image {
      width: 50%;
      height: 50%;
    }
    .app-title {
      font-size: 100px;
      font-weight: 400;
      margin: 20px 0px;
      color: rgb(0, 162, 255);
    }
    .app-description {
      font-size: 30px;
      font-weight: 400;
      color: rgb(0, 162, 255);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LandingPageComponent {}
export default LandingPageComponent;
