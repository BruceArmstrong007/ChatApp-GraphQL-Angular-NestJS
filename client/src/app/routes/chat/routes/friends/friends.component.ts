import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { UserCardComponent } from '../../../../shared/components/user-card/user-card.component';
import { friendsState } from './friends.state';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [MatCardModule, MatIcon, UserCardComponent],
  template: `
    <mat-card class="max-w-full">
      <mat-card-header>
        <mat-card-title>Friends</mat-card-title>
      </mat-card-header>
      <mat-card-content class="w-full h-full flex flex-column gap-10">
        <div class="cards-section overflow-y-auto">
          @for (user of friendsState.friends(); track user._id) {
            <app-user-card [user]="user">
              <ng-container ngProjectAs="buttons">
                <button
                  type="button"
                  mat-mini-fab
                  color="warn"
                  (click)="removeFriend(user._id)">
                  <mat-icon class="mat-18">person_remove</mat-icon>
                </button>
              </ng-container>
            </app-user-card>
          } @empty {
            <div
              class="w-full h-full flex justify-center items-center font-size-xl">
              <mat-icon class="mat-18">group</mat-icon>
              <span class="pl-1">Friend list is empty</span>
            </div>
          }
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .cards-section {
      height: calc(100dvh - 150px);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [friendsState],
})
class FriendsComponent {
  readonly friendsState = inject(friendsState);

  removeFriend(userID: string | undefined) {
    if (!userID) return;
  }
}
export default FriendsComponent;
