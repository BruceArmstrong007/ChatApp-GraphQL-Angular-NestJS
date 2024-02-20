import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: ` <div>login works!</div> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LoginComponent {}
export default LoginComponent;
