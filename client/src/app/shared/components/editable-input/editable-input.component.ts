import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-editable-input',
  standalone: true,
  imports: [],
  template: ` <p>editable-input works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableInputComponent {}
