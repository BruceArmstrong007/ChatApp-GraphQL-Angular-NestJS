import { MatSelectModule } from '@angular/material/select';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogData } from '../../profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgSwitch } from '@angular/common';

@Component({
  selector: 'app-input-field-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    NgSwitch,
    MatSelectModule,
  ],
  template: `
    <mat-dialog-content>
      <h3>{{ data.key }}</h3>
      <div class="w-full flex flex-column gap-10 p-5">
        <mat-form-field>
          <mat-label>Username</mat-label>
          @switch (data.key) {
            @case ('Bio') {
              <textarea
                [(ngModel)]="input"
                matInput
                placeholder="Enter your Bio"
                maxlength="500">
              </textarea>
            }
            @case ('Age') {
              <input
                type="number"
                [(ngModel)]="input"
                matInput
                placeholder="Enter your Age"
                min="1"
                max="150" />
            }
            @case ('Date of birth') {
              <input
                type="date"
                [(ngModel)]="input"
                matInput
                placeholder="Enter your Date"
                max="150" />
            }
            @case ('Gender') {
              <mat-select [(ngModel)]="input" placeholder="Select your gender">
                <mat-option value="Female">Female</mat-option>
                <mat-option value="Male">Male</mat-option>
                <mat-option value="Others">Others</mat-option>
              </mat-select>
            }
            @default {
              <input
                type="text"
                [(ngModel)]="input"
                matInput
                [placeholder]="'Enter your ' + data.key.toLowerCase()" />
            }
          }
        </mat-form-field>

        <button type="button" (click)="update()" mat-button>Update</button>
      </div>
    </mat-dialog-content>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldDialogComponent {
  input: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<InputFieldDialogComponent>
  ) {
    this.input = this.data.value;
  }

  update() {

    const key: string = inputFieldKey[this.data.key];
    this.dialogRef.close({
      [key]: this.input,
    });
  }
}
export const inputFieldKey = {
  Age: 'age',
  Name: 'name',
  Bio: 'bio',
  'Date of birth': 'dob',
  Gender: 'gender',
  Location: 'location',
  Username: 'username',
};
