// features/wallet-management/components/wallet-list/wallet-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WalletApiService } from '@core/services/wallet-api.service';
import { XofPipe, PhoneFormatPipe } from '@shared/pipes';
import { Wallet } from '@app/models';

@Component({
  selector: 'app-wallet-list',
  standalone: true,
  imports: [CommonModule, RouterLink, XofPipe, PhoneFormatPipe],
  template: `
    <div class="wallet-list-container">
      <h2>Gestion des Portefeuilles</h2>
      
      <!-- Search Bar -->
      <div class="search-section">
        <div class="search-input">
          <input 
            type="text" 
            placeholder="Rechercher par numéro de téléphone..."
            (input)="searchPhone($event)"
          />
          <button (click)="searchWallet()">
            <i class="fas fa-search"></i> Rechercher
          </button>
        </div>
        <button class="btn-primary" routerLink="/admin/wallets/create">
          <i class="fas fa-plus"></i> Nouveau Portefeuille
        </button>
      </div>

      <!-- Loading Spinner -->
      <app-loading-spinner *ngIf="loading"></app-loading-spinner>

      <!-- Wallet Table -->
      <div class="table-container" *ngIf="!loading">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Numéro</th>
              <th>Email</th>
              <th>Solde</th>
              <th>Date Création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let wallet of wallets">
              <td><strong>{{ wallet.code }}</strong></td>
              <td>{{ wallet.phoneNumber | phoneFormat }}</td>
              <td>{{ wallet.email }}</td>
              <td class="balance">{{ wallet.balance | xof }}</td>
              <td>{{ wallet.createdAt | date:'dd/MM/yyyy' }}</td>
              <td>
                <button (click)="viewWallet(wallet)" class="btn-sm">
                  <i class="fas fa-eye"></i>
                </button>
                <button (click)="deposit(wallet)" class="btn-sm success">
                  <i class="fas fa-plus"></i>
                </button>
                <button (click)="withdraw(wallet)" class="btn-sm warning">
                  <i class="fas fa-minus"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <app-pagination
        [currentPage]="currentPage"
        [totalPages]="totalPages"
        (pageChange)="changePage($event)"
      ></app-pagination>
    </div>
  `
})
export class WalletListComponent implements OnInit {
  wallets: Wallet[] = [];
  loading = false;
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  searchTerm = '';

  constructor(private walletApi: WalletApiService) {}

  ngOnInit(): void {
    this.loadWallets();
  }

  loadWallets(): void {
    this.loading = true;
    this.walletApi.getWallets(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.wallets = data.content;
        this.totalElements = data.totalElements;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load wallets', error);
        this.loading = false;
        // Show toast error
      }
    });
  }

  searchPhone(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }

  searchWallet(): void {
    if (!this.searchTerm) {
      this.loadWallets();
      return;
    }
    
    this.loading = true;
    this.walletApi.getWalletByPhone(this.searchTerm).subscribe({
      next: (wallet) => {
        this.wallets = [wallet];
        this.totalElements = 1;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        // Show toast: "Wallet not found"
      }
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadWallets();
  }

  viewWallet(wallet: Wallet): void {
    // Navigate to wallet details
  }

  deposit(wallet: Wallet): void {
    // Open deposit modal
  }

  withdraw(wallet: Wallet): void {
    // Open withdraw modal
  }

  get totalPages(): number {
    return Math.ceil(this.totalElements / this.pageSize);
  }
}