// src/app/validators/phone.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    
    // Nettoyer la valeur (enlever espaces, tirets, parenthèses)
    const cleaned = value.replace(/[\s\-\(\)\+]/g, '');
    
    // Accepter tous ces formats:
    // - 770000001 (9 chiffres)
    // - 221770000001 (12 chiffres)  
    // - +221770000001 (12 chiffres avec +)
    // - 221 77 000 00 01 (avec espaces)
    // - 77 000 00 01 (avec espaces)
    
    // Vérifier si c'est 9 chiffres commençant par 77
    if (/^77[0-9]{7}$/.test(cleaned)) {
      return null;
    }
    
    // Vérifier si c'est 12 chiffres commençant par 22177
    if (/^22177[0-9]{7}$/.test(cleaned)) {
      return null;
    }
    
    // Vérifier si c'est 12 chiffres avec +22177
    if (/^\+22177[0-9]{7}$/.test(cleaned)) {
      return null;
    }
    
    return { invalidPhone: { value } };
  };
}