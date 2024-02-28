import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AvatarModule } from 'ngx-avatars';
import { Store } from '@ngrx/store';
import { userFeature } from '../../state/user/user.reducer';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    AvatarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatBadgeModule,
  ],
  template: `
    <div class="flex flex-column h-full z-index-1">
      <app-navbar>
        <ngx-avatars
          class="px-20"
          [src]="profile()?.url"
          [value]="user()?.name?.charAt(0)"></ngx-avatars>
      </app-navbar>
      <div class="w-full flex-grow flex justify-start">
        <div class="control-container p-5">
          <mat-card class="w-full h-full">
            <mat-card-content
              class="h-full flex flex-column justify-between items-center">
              <div
                class="flex-grow h-full flex flex-column justify-start gap-10">
                <a [routerLink]="['/chat']" title="Chat">
                  <button mat-fab aria-label="chat" title="Chat">
                    <mat-icon>chat</mat-icon>
                  </button>
                </a>
                <a [routerLink]="['/friends']" title="Friends">
                  <button mat-fab aria-label="friends" title="Friends">
                    <mat-icon>people</mat-icon>
                  </button>
                </a>
                <a
                  [routerLink]="['/received-requests']"
                  title="Received friend requests">
                  <button
                    mat-fab
                    aria-label="received friend requests"
                    title="Received friend requests">
                    <mat-icon>group_add</mat-icon>
                  </button>
                </a>
              </div>
              <div class="flex flex-column gap-10">
                <hr class="w-full" />
                <a [routerLink]="['/find-friends']" title="Find friends">
                  <button
                    mat-fab
                    disabled
                    aria-label="find friends"
                    title="Find friends">
                    <mat-icon>add</mat-icon>
                  </button>
                </a>
                <a [routerLink]="['/settings']" title="Settings">
                  <button mat-fab aria-label="settings" title="Settings">
                    <mat-icon>settings</mat-icon>
                  </button>
                </a>
                <a [routerLink]="['/profile']" title="Settings">
                  <ngx-avatars
                    [src]="profile()?.url"
                    [value]="user()?.name?.charAt(0)"></ngx-avatars>
                </a>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
        <div class="w-full h-full flex-grow p-5">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
  styles: `
    .control-container {
      height: 100%;
      width: 100px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ChatComponent {
  private readonly store = inject(Store);
  readonly profile = this.store.selectSignal(userFeature.userProfile);
  readonly user = this.store.selectSignal(userFeature.selectDetails);
}
export default ChatComponent;
