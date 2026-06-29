// shared/validators/phone.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    
    // Senegal phone number format: +221 77 123 45 67
    const phoneRegex = /^\+2217[0-9]{2}[0-9]{7}$/;
    const valid = phoneRegex.test(value);
    
    return valid ? null : { invalidPhone: { value } };
  };
}