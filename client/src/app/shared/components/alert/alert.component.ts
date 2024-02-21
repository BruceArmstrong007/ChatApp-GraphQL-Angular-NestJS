import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Alert } from '../../state/api-call.state';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      [ngClass]="{
        success: data.type === 'SUCCESS',
        error: data.type === 'ERROR',
        warn: data.type === 'WARN',
        info: data.type === 'INFO'
      }"
      class="alert">
      <h2>{{ data.title }}</h2>
      <p>{{ data.message }}</p>
    </div>
  `,
  styles: `
    .success {
      color: green;
    }
    .error {
      color: red;
    }
    .warn {
      color: orange;
    }
    .info {
      color: blue;
    }
    .alert {
      width: 100%;
      height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Alert) {}
}
