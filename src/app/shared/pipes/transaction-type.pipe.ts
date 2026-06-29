// shared/pipes/transaction-type.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionType',
  standalone: true
})
export class TransactionTypePipe implements PipeTransform {
  transform(value: string): string {
    const types: Record<string, string> = {
      'DEPOSIT': 'Dépôt',
      'WITHDRAWAL': 'Retrait',
      'TRANSFER': 'Transfert',
      'PAYMENT': 'Paiement'
    };
    return types[value] || value;
  }
}