import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
  ],
  template: `
    <mat-card>
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
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AddFriendsComponent {
  searchUser(target: EventTarget | null) {
    const input = target as HTMLInputElement;
    if (input.value) {
    }
  }
}
export default AddFriendsComponent;
