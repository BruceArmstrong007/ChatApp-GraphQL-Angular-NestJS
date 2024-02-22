import { ChangeDetectionStrategy, Component } from '@angular/core';
import { registerState } from './register.state';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  template: ` <p>register works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [registerState],
})
class RegisterComponent {}
export default RegisterComponent;
