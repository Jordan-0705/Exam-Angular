// src/app/shared/header/header.component.ts
import { Component, inject } from '@angular/core';
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
      <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; gap: 20px; align-items: center;">
          <h2 style="margin: 0;">🏦 BadWallet</h2>
          <a routerLink="/dashboard" style="color: white; text-decoration: none;">Dashboard</a>
          <a routerLink="/transfer" style="color: white; text-decoration: none;">Transfert</a>
          <a routerLink="/admin/wallets" style="color: white; text-decoration: none;">Admin</a>
        </div>
        <div style="display: flex; align-items: center; gap: 15px;">
          <span style="font-weight: bold;">{{ balanceStore.formattedBalance() }}</span>
          <span>👤 Client</span>
        </div>
      </div>
    </nav>
  `
})
export class HeaderComponent {
  balanceStore = inject(BalanceStore);
}