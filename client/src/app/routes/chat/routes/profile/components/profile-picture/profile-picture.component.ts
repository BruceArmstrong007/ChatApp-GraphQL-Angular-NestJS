import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarModule } from 'ngx-avatars';
import { Profile, User } from '../../../../../../../generated-types';

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [AvatarModule],
  template: `
    <div class="flex flex-column">
      <h3>Change Profile Picture</h3>
      <ngx-avatars
        class="cursor-pointer"
        [size]="150"
        [src]="profile()?.url"
        [value]="user()?.name?.charAt(0)"></ngx-avatars>
      <p>{{ user()?.name }}</p>
      <sub>{{ '@' + user()?.username }}</sub>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePictureComponent {
  user = input<User>();
  profile = input<Profile>();
}
