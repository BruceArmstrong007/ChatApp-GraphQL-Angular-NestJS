import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [],
  template: `
    <p>
      verify-account works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class VerifyAccountComponent {

}
export default VerifyAccountComponent;
