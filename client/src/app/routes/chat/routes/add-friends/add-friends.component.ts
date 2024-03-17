import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { addFriendsState } from './add-friends.state';
import { UserCardComponent } from '../../../../shared/components/user-card/user-card.component';

@Component({
  selector: 'app-add-friends',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    UserCardComponent,
    NgFor,
  ],
  template: `
    <mat-card class="max-w-full">
      <mat-card-header>
        <mat-card-title>Add Friends</mat-card-title>
      </mat-card-header>
      <mat-card-content class="w-full h-full flex flex-column gap-10">
        <div class="container-mx-auto">
          <mat-form-field>
            <mat-label>Search Friends</mat-label>
            <input
              type="text"
              matInput
              placeholder="Type username or name"
              (keyup)="searchUser($event.target)" />
            <mat-icon matSuffix fontIcon="search" />
            <mat-hint> Username starts with &#64; </mat-hint>
          </mat-form-field>
        </div>
        <div class="cards-section overflow-y-auto">
          @for (user of addFriendsState.users(); track user._id) {
            <app-user-card [user]="user">
              <ng-container ngProjectAs="buttons">
                <button
                  type="button"
                  mat-mini-fab
                  (click)="addFriend(user._id)">
                  <mat-icon class="mat-18">person_add</mat-icon>
                </button>
              </ng-container>
            </app-user-card>
          } @empty {
            <div
              class="w-full h-full flex justify-center items-center font-size-xl">
              <mat-icon class="mat-18">person_add</mat-icon>
              <span class="pl-1">Add some friends</span>
            </div>
          }
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .cards-section {
      height: calc(100dvh - 250px);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [addFriendsState],
})
class AddFriendsComponent {
  readonly addFriendsState = inject(addFriendsState);
  searchUser(target: EventTarget | null) {
    const input = target as HTMLInputElement;
    if (input.value) {
      this.addFriendsState.searchUsers(input.value);
    } else {
      this.addFriendsState.emptyState();
    }
  }

  addFriend(userID: string | undefined) {
    if (!userID) return;
    this.addFriendsState.sendRequest({
      contactID: userID,
    });
  }
}
export default AddFriendsComponent;
