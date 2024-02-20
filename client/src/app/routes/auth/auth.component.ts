import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet],
  template: ``,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class AuthComponent {

}
export default AuthComponent;
