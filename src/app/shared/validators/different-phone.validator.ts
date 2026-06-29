// shared/validators/different-phone.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function differentPhoneValidator(currentPhone: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const destination = control.get('destination')?.value;
    const amount = control.get('amount')?.value;
    
    if (!destination || !amount) return null;
    
    // Check if sender and receiver are the same
    if (destination === currentPhone) {
      return { samePhone: { value: destination } };
    }
    
    // Check minimum amount
    if (amount <= 0) {
      return { minAmount: { value: amount } };
    }
    
    return null;
  };
}