// shared/pipes/xof.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xof',
  standalone: true
})
export class XofPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '0 XOF';
    }
    
    return new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}

// Usage: {{ 50000 | xof }} → "50 000 XOF"