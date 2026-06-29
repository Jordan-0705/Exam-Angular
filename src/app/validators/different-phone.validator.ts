// src/app/validators/different-phone.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function differentPhoneValidator(currentPhone: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const destination = control.get('destination')?.value;
    return destination === currentPhone ? { samePhone: { value: destination } } : null;
  };
}