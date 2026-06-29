// src/app/services/balance-store.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { WalletApiService } from './wallet-api.service';

@Injectable({ providedIn: 'root' })
export class BalanceStore {
  private balanceSignal = signal<number>(0);
  private phoneSignal = signal<string>('');

  readonly balance = computed(() => this.balanceSignal());
  readonly formattedBalance = computed(() => {
    return new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0
    }).format(this.balanceSignal());
  });

  constructor(private walletApi: WalletApiService) {}

  // src/app/services/balance-store.service.ts
    refresh(phone: string): void {
    console.log('🔄 BalanceStore.refresh() appelé pour:', phone);
    this.phoneSignal.set(phone);
    this.walletApi.getBalance(phone).subscribe({
        next: (b) => {
        console.log('✅ Balance reçue:', b);
        this.balanceSignal.set(b);
        },
        error: (err) => {
        console.error('❌ Erreur lors du refresh du solde:', err);
        }
    });
    }

  update(newBalance: number): void {
    this.balanceSignal.set(newBalance);
  }

  clear(): void {
    this.balanceSignal.set(0);
    this.phoneSignal.set('');
  }
}