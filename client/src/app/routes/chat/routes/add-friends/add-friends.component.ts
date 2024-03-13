import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-friends',
  standalone: true,
  imports: [],
  template: ` <p>add-friends works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AddFriendsComponent {}
export default AddFriendsComponent;
