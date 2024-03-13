import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { userFeature } from '../../../../state/user/user.reducer';
import { TitleCasePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Profile, ProfileForm } from './profile.types';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { InputFieldDialogComponent } from './components/input-field-dialog/input-field-dialog.component';
import { profileState } from './profile.state';
import {
  ProfileEvent,
  ProfilePictureComponent,
} from './components/profile-picture/profile-picture.component';
import { AlertType } from '../../../../shared/state/api-call.state';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    TitleCasePipe,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    ProfilePictureComponent,
  ],
  template: `
    <mat-card class="max-w-full">
      <mat-card-header>
        <mat-card-title
          >{{ user()?.name | titlecase }}'s profile</mat-card-title
        >
      </mat-card-header>
      <mat-card-content class="w-full h-full flex flex-column gap-10">
        <app-profile-picture
          (profilePictureEvent)="profileEvent($event)"
          [user]="user()"
          [profile]="profile()" />
        <div class="flex flex-column gap-5">
          <table class="w-full editable">
            <tr>
              <td>Username :</td>
              <td colspan="2">
                <p>{{ user()?.username }}</p>
              </td>
              <td>
                <!-- <mat-icon
                  title="edit"
                  (click)="editEvent('Username', user()?.username)"
                  class="cursor-pointer"
                  >edit</mat-icon
                > -->
              </td>

              <td>Date of birth :</td>
              <td colspan="2">
                <p>{{ user()?.dob }}</p>
              </td>
              <td>
                <mat-icon
                  title="edit"
                  (click)="editEvent('Date of birth', user()?.dob)"
                  class="cursor-pointer"
                  >edit</mat-icon
                >
              </td>
            </tr>
            <tr>
              <td>Name :</td>
              <td colspan="2">
                <p>{{ user()?.name }}</p>
              </td>
              <td>
                <mat-icon
                  title="edit"
                  (click)="editEvent('Name', user()?.name)"
                  class="cursor-pointer"
                  >edit</mat-icon
                >
              </td>

              <td>Gender :</td>
              <td colspan="2">
                <p>{{ user()?.gender }}</p>
              </td>
              <td>
                <mat-icon
                  title="edit"
                  (click)="editEvent('Gender', user()?.gender)"
                  class="cursor-pointer"
                  >edit</mat-icon
                >
              </td>
            </tr>
            <tr>
              <td>Location :</td>
              <td colspan="2">
                <p>{{ user()?.location }}</p>
              </td>
              <td>
                <mat-icon
                  title="edit"
                  (click)="editEvent('Location', user()?.location)"
                  class="cursor-pointer"
                  >edit</mat-icon
                >
              </td>
              <td>Age :</td>
              <td colspan="2">
                <p>{{ user()?.age }}</p>
              </td>
              <td>
                <mat-icon
                  title="edit"
                  (click)="editEvent('Age', user()?.age)"
                  class="cursor-pointer"
                  >edit</mat-icon
                >
              </td>
            </tr>
            <tr>
              <td>Bio :</td>
              <td colspan="6">
                <p>{{ user()?.bio }}</p>
              </td>
              <td>
                <mat-icon
                  title="edit"
                  (click)="editEvent('Bio', user()?.bio)"
                  class="cursor-pointer"
                  >edit</mat-icon
                >
              </td>
            </tr>
          </table>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .editable {
      border-collapse: separate;
      border-spacing: 20px;
    }
  `,
  providers: [profileState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ProfileComponent {
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);
  private readonly profileState = inject(profileState);
  readonly profile = this.store.selectSignal(userFeature.userProfile);
  readonly user = this.store.selectSignal(userFeature.selectDetails);
  private readonly form = new FormGroup<ProfileForm>({
    _id: new FormControl('', { nonNullable: true }),
    username: new FormControl('', {
      validators: Validators.compose([Validators.minLength(8)]),
    }),
    name: new FormControl('', {
      validators: Validators.compose([Validators.maxLength(50)]),
    }),
    bio: new FormControl('', {
      validators: Validators.compose([Validators.maxLength(500)]),
    }),
    dob: new FormControl(''),
    location: new FormControl(''),
    gender: new FormControl(''),
    age: new FormControl(null, {
      validators: Validators.compose([Validators.min(1), Validators.max(150)]),
    }),
  });
  currentDialog!: MatDialogRef<InputFieldDialogComponent, any> | undefined;
  get formControl() {
    return this.form.controls;
  }

  editEvent(key: string, value: any) {
    this.currentDialog = this.dialog.open(InputFieldDialogComponent, {
      data: {
        key,
        value,
      },
    });
    this.currentDialog.afterClosed().subscribe((res: any) => {
      if (!res) return;
      console.log(res);

      const revForm = this.form.value;

      this.form.patchValue({
        ...this.form.value,
        ...res,
        _id: this.user()?._id,
      });

      if (!this.form.valid) {
        this.form.reset();
        this.form.patchValue({ ...revForm });
        // const ik: string = (inputFieldKey as any)[key];
        // const errors = (this.form?.controls as any)[ik]?.errors;
        this.profileState.errorAlert('Validation Error', `${key} is invalid`);
        return;
      }

      const result: any = this.form.value;

      this.profileState.updateUser({
        ...removeEmptyKeys(result),
        _id: this.user()?._id,
      } as Profile);
    });
  }

  profileEvent(event: ProfileEvent) {
    switch (event.action) {
      case 'alert':
        this.profileState.openAlert(
          event?.data['title'],
          event?.data['message'],
          event?.data['type'] as AlertType
        );
        break;

      case 'uploadProfile':
        if (event.data) {
          const prevFilename = this.profile()?.filename ?? '';
          const form = {
            profile: event.data,
            prevFilename,
          };
          this.profileState.updateProfile(form);
        }
        break;
      default:
        break;
    }
  }
}

export interface DialogData {
  key:
    | 'Name'
    | 'Username'
    | 'Bio'
    | 'Date of birth'
    | 'Age'
    | 'Location'
    | 'Gender';
  value: any;
}
export function removeEmptyKeys(obj: any): any {
  Object.keys(obj).forEach(key => {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete obj[key];
    }
  });
  return obj;
}

export default ProfileComponent;
