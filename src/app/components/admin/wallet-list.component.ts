// src/app/components/admin/wallet-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WalletApiService } from '../../services/wallet-api.service';
import { XofPipe } from '../../pipes/xof.pipe';
import { PhoneFormatPipe } from '../../pipes/phone-format.pipe';
import { Wallet } from '../../models/wallet.model';

@Component({
  selector: 'app-wallet-list',
  standalone: true,
  imports: [CommonModule, RouterLink, XofPipe, PhoneFormatPipe],
  template: `
    <div style="padding: 20px;">
      <h1>👛 Gestion des Portefeuilles</h1>
      
      <div style="display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap;">
        <input type="text" placeholder="Rechercher par téléphone..." 
               (input)="searchTerm = $any($event.target).value"
               style="flex:1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; min-width: 200px;">
        <button (click)="searchWallet()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
          🔍 Rechercher
        </button>
        <button (click)="loadWallets()" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
          🔄 Rafraîchir
        </button>
        <button routerLink="/admin/wallets/create" style="background: #17a2b8; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
          ➕ Nouveau
        </button>
      </div>

      <div style="background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; min-width: 600px;">
          <thead style="background: #f8f9fa;">
            <tr>
              <th style="padding: 12px; text-align: left;">Code</th>
              <th style="padding: 12px; text-align: left;">Téléphone</th>
              <th style="padding: 12px; text-align: left;">Email</th>
              <th style="padding: 12px; text-align: right;">Solde</th>
              <th style="padding: 12px; text-align: center;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let wallet of wallets">
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6;"><strong>{{ wallet.code }}</strong></td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">{{ wallet.phoneNumber | phoneFormat }}</td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">{{ wallet.email }}</td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: right; color: #28a745;">{{ wallet.balance | xof }}</td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: center;">
                <button (click)="deposit(wallet)" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin: 0 5px;">💰</button>
                <button (click)="withdraw(wallet)" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin: 0 5px;">💳</button>
              </td>
            </tr>
            <tr *ngIf="wallets.length === 0">
              <td colspan="5" style="padding: 20px; text-align: center; color: #6c757d;">
                Aucun portefeuille trouvé
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin-top: 20px; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
        <button (click)="changePage(currentPage - 1)" [disabled]="currentPage === 0" 
                style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer;">
          ◀ Précédent
        </button>
        <span style="padding: 8px 16px;">Page {{ currentPage + 1 }} / {{ totalPages }}</span>
        <button (click)="changePage(currentPage + 1)" [disabled]="currentPage >= totalPages - 1"
                style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer;">
          Suivant ▶
        </button>
      </div>
    </div>
  `
})
export class WalletListComponent implements OnInit {
  private walletApi = inject(WalletApiService);
  wallets: Wallet[] = [];
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  searchTerm = '';

  ngOnInit(): void {
    this.loadWallets();
  }

  loadWallets(): void {
    this.walletApi.getWallets(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.wallets = data.content;
        this.totalElements = data.totalElements;
      },
      error: (err) => console.error('Failed to load wallets', err)
    });
  }

  searchWallet(): void {
    if (!this.searchTerm) { this.loadWallets(); return; }
    this.walletApi.getWalletByPhone(this.searchTerm).subscribe({
      next: (wallet) => this.wallets = [wallet],
      error: () => alert('Portefeuille non trouvé')
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadWallets();
  }

  get totalPages(): number {
    return Math.ceil(this.totalElements / this.pageSize) || 1;
  }

  deposit(wallet: Wallet): void {
    const amount = prompt(`Entrez le montant à déposer pour ${wallet.phoneNumber}:`);
    if (amount && !isNaN(Number(amount))) {
      this.walletApi.deposit(wallet.id, { amount: Number(amount), paymentMethod: 'CASH' }).subscribe({
        next: () => {
          alert('✅ Dépôt effectué avec succès !');
          this.loadWallets();
        },
        error: (err) => alert('❌ Erreur: ' + err.error?.message)
      });
    }
  }

  withdraw(wallet: Wallet): void {
    const amount = prompt(`Entrez le montant à retirer pour ${wallet.phoneNumber}:`);
    if (amount && !isNaN(Number(amount))) {
      this.walletApi.withdraw({ phoneNumber: wallet.phoneNumber, amount: Number(amount) }).subscribe({
        next: () => {
          alert('✅ Retrait effectué avec succès !');
          this.loadWallets();
        },
        error: (err) => alert('❌ Erreur: ' + err.error?.message)
      });
    }
  }
}