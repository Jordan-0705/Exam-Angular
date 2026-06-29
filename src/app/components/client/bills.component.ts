// src/app/components/client/bills.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingApiService } from '../../services/billing-api.service';
import { WalletApiService } from '../../services/wallet-api.service';
import { BalanceStore } from '../../services/balance-store.service';
import { Facture } from '../../models/facture.model';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [CommonModule], // Ajout de CommonModule
  template: `
    <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
      <h1>📑 Paiement des Factures</h1>
      
      <div style="margin-bottom: 20px;">
        <label style="font-weight: 500;">Filtrer par fournisseur :</label>
        <select (change)="filterByProvider($any($event.target).value)" 
                style="padding: 10px; border: 1px solid #ddd; border-radius: 6px; margin-left: 10px;">
          <option value="">Tous</option>
          <option value="ISM">ISM</option>
          <option value="WOYAFAL">WOYAFAL</option>
          <option value="SENELEC">SENELEC</option>
          <option value="SONATEL">SONATEL</option>
        </select>
      </div>
      
      <div style="background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead style="background: #f8f9fa;">
            <tr>
              <th style="padding: 12px; text-align: left;">Référence</th>
              <th style="padding: 12px; text-align: left;">Fournisseur</th>
              <th style="padding: 12px; text-align: right;">Montant</th>
              <th style="padding: 12px; text-align: center;">Statut</th>
              <th style="padding: 12px; text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let bill of bills">
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">{{ bill.reference }}</td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">{{ bill.provider }}</td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: right;">{{ bill.amount }} XOF</td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: center;">
                <span style="padding: 4px 12px; border-radius: 12px; font-size: 12px; 
                             background: {{ bill.status === 'UNPAID' ? '#dc3545' : '#28a745' }}; 
                             color: white;">
                  {{ bill.status }}
                </span>
              </td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: center;">
                <button *ngIf="bill.status === 'UNPAID'" (click)="payBill(bill)"
                        style="background: #28a745; color: white; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer;">
                  Payer
                </button>
              </td>
            </tr>
            <tr *ngIf="bills.length === 0">
              <td colspan="5" style="padding: 20px; text-align: center; color: #6c757d;">
                Aucune facture trouvée
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class BillsComponent implements OnInit {
  private billingApi = inject(BillingApiService);
  private walletApi = inject(WalletApiService);
  private balanceStore = inject(BalanceStore);
  bills: Facture[] = [];
  walletCode = 'WLT-0000001';
  currentPhone = '+221770000001';

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.billingApi.getCurrentBills(this.walletCode).subscribe({
      next: (data) => this.bills = data,
      error: () => console.error('Failed to load bills')
    });
  }

  filterByProvider(provider: string): void {
    if (provider) {
      this.billingApi.getCurrentBillsByProvider(this.walletCode, provider).subscribe({
        next: (data) => this.bills = data
      });
    } else {
      this.loadBills();
    }
  }

  payBill(bill: Facture): void {
    if (confirm(`Payer la facture ${bill.reference} de ${bill.amount} XOF ?`)) {
      this.walletApi.payCurrentBill({
        phoneNumber: this.currentPhone,
        serviceName: bill.provider
      }).subscribe({
        next: () => {
          alert('✅ Facture payée avec succès !');
          this.balanceStore.refresh(this.currentPhone);
          this.loadBills();
        },
        error: (err) => {
          alert('❌ Erreur: ' + (err.error?.message || 'Solde insuffisant'));
        }
      });
    }
  }
}