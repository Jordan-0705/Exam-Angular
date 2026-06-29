// core/services/balance-store.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { WalletApiService } from './wallet-api.service';

@Injectable({ providedIn: 'root' })
export class BalanceStore {
  // State signals
  private balanceSignal = signal<number>(0);
  private phoneSignal = signal<string>('');
  
  // Computed values
  readonly balance = computed(() => this.balanceSignal());
  readonly formattedBalance = computed(() => 
    new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0
    }).format(this.balanceSignal())
  );

  constructor(private walletApi: WalletApiService) {}

  // Refresh balance
  refreshBalance(phone: string): void {
    this.phoneSignal.set(phone);
    this.walletApi.getBalance(phone).subscribe({
      next: (balance) => this.balanceSignal.set(balance),
      error: (error) => console.error('Failed to refresh balance', error)
    });
  }

  // Update balance after transaction
  updateBalance(newBalance: number): void {
    this.balanceSignal.set(newBalance);
  }

  // Clear state
  clear(): void {
    this.balanceSignal.set(0);
    this.phoneSignal.set('');
  }
}