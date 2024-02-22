import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationService {
  MatchValidator(key1: string, key2: string): ValidationErrors | null {
    return (control: AbstractControl) => {
      if (control.value[key1] !== control.value[key2]) {
        return control?.get(key2)?.setErrors({
          ...(control?.get(key2)?.errors || {}),
          mismatch: true,
        });
      }
      let errors: any = { ...(control.get(key2)?.errors || {}) };
      if (errors['mismatch']) {
        delete errors['mismatch'];
      }
      if (Object.keys(errors).length == 0) errors = null;
      return control.get(key2)?.setErrors(errors);
    };
  }
}
