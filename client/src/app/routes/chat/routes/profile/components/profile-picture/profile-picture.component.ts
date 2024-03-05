import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
  inject,
  input,
} from '@angular/core';
import { AvatarModule } from 'ngx-avatars';
import { User } from '../../../../../../state/user/user.model';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { ThemeService } from '../../../../../../shared/services/theme/theme.service';

export interface ProfileEvent {
  action: 'alert' | 'uploadProfile';
  data: any;
}

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [
    AvatarModule,
    ImageCropperModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
  ],
  template: `
    <div class="flex flex-column z-index-1">
      <h3>Change Profile Picture</h3>
      <ngx-avatars
        (click)="profileClick()"
        class="cursor-pointer"
        [size]="150"
        [src]="profile()?.url ?? 'assets/default-profile.jpg'"
        [value]="user()?.name?.charAt(0)"></ngx-avatars>
      <p>{{ user()?.name }}</p>
      <sub>{{ '@' + user()?.username }}</sub>
    </div>
    <input
      accept="image/*"
      type="file"
      class="invisible"
      #fileInput
      (change)="fileChangeEvent($event)" />

    <dialog
      #cropper
      class="dialog"
      [ngClass]="{
        'dark-theme': theme.darkMode(),
        'light-theme': !theme.darkMode()
      }">
      <form method="dialog" class="w-full h-full">
        <div class="w-full flex h-10 justify-between items-center">
          <h3>Image Cropper</h3>
          <button mat-mini-fab (click)="closeDialog()">
            <mat-icon class="mat-18">close</mat-icon>
          </button>
        </div>
        <div class="h-75 flex justify-between">
          <div
            class="w-half h-half p-2 flex flex-column justify-center items-start">
            <h3>Crop Image</h3>
            <image-cropper
              [imageChangedEvent]="imageChangedEvent"
              [maintainAspectRatio]="true"
              [onlyScaleDown]="true"
              format="png"
              (imageCropped)="imageCropped($event)"
              (loadImageFailed)="loadImageFailed()"
              (imageLoaded)="imageLoaded()"></image-cropper>
          </div>
          <div
            class="flex flex-column justify-center items-center w-half h-half p-1">
            <h3>Preview</h3>

            <img [src]="croppedImage" class="h-full" alt="profile" priority />
          </div>
        </div>
        <div class="w-full h-10 flex justify-between items-center">
          <button mat-flat-button (click)="closeDialog()" color="warn">
            Cancel
          </button>
          <button mat-flat-button (click)="crop()">Confirm</button>
        </div>
      </form>
    </dialog>
  `,
  styles: `
    .invisible {
      visibility: hidden;
    }
    .dialog {
      width: 80dvw;
      height: 90dvh;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePictureComponent {
  readonly theme = inject(ThemeService);
  user = input<User>();
  profile = input<
    | { url: string; filename: string; createdAt: string; updatedAt: string }
    | null
    | undefined
  >();
  @Output() profilePictureEvent = new EventEmitter<ProfileEvent>();
  @ViewChild('cropper', { read: ElementRef })
  cropper!: ElementRef<HTMLDialogElement>;
  @ViewChild('fileInput', { read: ElementRef })
  fileInput!: ElementRef<HTMLInputElement>;
  imageChangedEvent: Event | undefined;
  croppedImage: SafeUrl | undefined;
  croppedImageBlob: Blob | null | undefined;
  private readonly sanitizer = inject(DomSanitizer);

  profileClick() {
    this.fileInput.nativeElement.click();
  }

  imageLoaded() {
    this.cropper.nativeElement.showModal();
  }

  closeDialog() {
    if (!this.cropper) return;
    this.cropper.nativeElement.close();
    this.resetCropper();
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl as string
    );
    this.croppedImageBlob = event.blob;
  }

  loadImageFailed() {
    this.profilePictureEvent.emit({
      action: 'alert',
      data: {
        message: 'Error while loading your image.',
        type: 'ERROR',
        title: 'Load Error',
      },
    });
  }

  crop() {
    if (!this.croppedImageBlob) return;
    const file = new File([this.croppedImageBlob], 'file_name', {
      lastModified: new Date().getTime(),
      type: this.croppedImageBlob?.type,
    });
    this.fileUpload(file);
    this.closeDialog();
    this.resetCropper();
  }

  resetCropper() {
    this.croppedImage = undefined;
    this.imageChangedEvent = undefined;
    this.croppedImageBlob = undefined;
    this.fileInput.nativeElement.value = '';
  }

  fileUpload(file: File) {
    if (!file) {
      return;
    }
    this.profilePictureEvent.emit({
      action: 'uploadProfile',
      data: file,
    });

    // const prevFilename = this.userProfile()?.filename ?? '';
    // const form = {
    //   profile: file,
    //   prevFilename,
    // };
    // this.store.dispatch(userActions.uploadProfile(form));
  }

  @HostListener('keydown')
  onClose(event: KeyboardEvent) {
    if (event?.key === 'Escape' || event?.keyCode === 27) {
      this.resetCropper();
    }
  }
}
