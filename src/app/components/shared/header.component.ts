// src/app/components/shared/header.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BalanceStore } from '../../services/balance-store.service';
import { XofPipe } from '../../pipes/xof.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, XofPipe],
  template: `
    <nav style="background: #2c3e50; padding: 15px 20px; color: white;">
      <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
          <h2 style="margin: 0;">🏦 BadWallet</h2>
          <a routerLink="/dashboard" style="color: white; text-decoration: none;">Dashboard</a>
          <a routerLink="/transfer" style="color: white; text-decoration: none;">Transfert</a>
          <a routerLink="/transactions" style="color: white; text-decoration: none;">Historique</a>
          <a routerLink="/bills" style="color: white; text-decoration: none;">Factures</a>
          <a routerLink="/admin/wallets" style="color: white; text-decoration: none;">Admin</a>
        </div>
        <div style="display: flex; align-items: center; gap: 15px;">
          <span style="font-weight: bold;">{{ balanceStore.balance() | xof }}</span>
          <span style="font-size: 12px; opacity: 0.7;">{{ currentPhone }}</span>
        </div>
      </div>
    </nav>
  `
})
export class HeaderComponent implements OnInit {
  balanceStore = inject(BalanceStore);
  // Utiliser le numéro qui existe dans la base
  currentPhone = '+221770000001';

  ngOnInit(): void {
    console.log('🔄 Rafraîchissement du solde pour:', this.currentPhone);
    this.balanceStore.refresh(this.currentPhone);
  }
}