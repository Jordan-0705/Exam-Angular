// src/app/components/client/transactions.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletApiService } from '../../services/wallet-api.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
      <h1>📊 Historique des Transactions</h1>
      
      <div style="margin-bottom: 15px; color: #6c757d; font-size: 14px;">
        Client: {{ currentPhone }}
      </div>
      
      <div style="background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead style="background: #f8f9fa;">
            <tr>
              <th style="padding: 12px; text-align: left;">Date</th>
              <th style="padding: 12px; text-align: left;">Type</th>
              <th style="padding: 12px; text-align: left;">Description</th>
              <th style="padding: 12px; text-align: right;">Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let tx of transactions">
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">{{ tx.createdAt | date:'dd/MM/yyyy HH:mm' }}</td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">{{ tx.type }}</td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">{{ tx.description }}</td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: right; 
                         color: {{ tx.type === 'DEPOSIT' ? '#28a745' : '#dc3545' }};">
                {{ tx.type === 'DEPOSIT' ? '+' : '-' }}{{ tx.amount }} XOF
              </td>
            </tr>
            <tr *ngIf="transactions.length === 0">
              <td colspan="4" style="padding: 20px; text-align: center; color: #6c757d;">
                Aucune transaction trouvée pour {{ currentPhone }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class TransactionsComponent implements OnInit {
  private walletApi = inject(WalletApiService);
  transactions: Transaction[] = [];
  currentPhone = '+221770000001';

  ngOnInit(): void {
    console.log('🔄 Chargement des transactions pour:', this.currentPhone);
    this.walletApi.getTransactionHistory(this.currentPhone).subscribe({
      next: (data) => {
        this.transactions = data;
        console.log('✅ Transactions chargées:', data.length);
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des transactions:', err);
      }
    });
  }
}