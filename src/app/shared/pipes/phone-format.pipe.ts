// shared/pipes/phone-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format for Senegal numbers (+221 77 123 45 67)
    if (cleaned.length === 12 && cleaned.startsWith('221')) {
      const country = cleaned.slice(0, 3);
      const first = cleaned.slice(3, 5);
      const second = cleaned.slice(5, 8);
      const third = cleaned.slice(8, 10);
      const fourth = cleaned.slice(10, 12);
      return `+${country} ${first} ${second} ${third} ${fourth}`;
    }
    
    return value;
  }
}

// Usage: {{ '+221778899001' | phoneFormat }} → "+221 77 88 99 00 1"