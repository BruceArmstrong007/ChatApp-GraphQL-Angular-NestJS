import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { User } from '../../utils/types';
import { MatCardModule } from '@angular/material/card';
import { AvatarModule } from 'ngx-avatars';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatCardModule, AvatarModule],
  template: `
    <mat-card>
      <mat-card-header>
        <ngx-avatars
          mat-card-avatar
          [src]="user().profile?.url"
          [value]="user().name?.charAt(0)"></ngx-avatars>
        <mat-card-title class="text-ellipsis">{{ user().name }}</mat-card-title>
        <mat-card-subtitle>{{ '@' + user().username }}</mat-card-subtitle>
        <div style="margin: 0 auto"></div>
        <ng-content #buttons></ng-content>
      </mat-card-header>
      <mat-card-content>
        <p>
          {{
            user().bio
              ? user().bio
              : "Contemplating the crafting of my profile's narrative."
          }}
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  user = input.required<Partial<User>>();
}
