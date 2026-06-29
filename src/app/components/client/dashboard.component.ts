// src/app/components/client/dashboard.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BalanceStore } from '../../services/balance-store.service';
import { WalletApiService } from '../../services/wallet-api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="text-align: center; padding: 20px;">
      <h1>🏠 Tableau de Bord</h1>
      
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                  color: white; padding: 30px; border-radius: 16px; margin: 20px 0;">
        <h3>Solde Disponible</h3>
        <div style="font-size: 48px; font-weight: 700;">{{ balanceStore.formattedBalance() }}</div>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h4>📤 Transfert</h4>
          <button routerLink="/transfer" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
            Transférer
          </button>
        </div>
        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h4>📄 Historique</h4>
          <button routerLink="/transactions" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
            Voir les transactions
          </button>
        </div>
        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h4>📑 Factures</h4>
          <button routerLink="/bills" style="background: #17a2b8; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
            Voir les factures
          </button>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  balanceStore = inject(BalanceStore);
  private walletApi = inject(WalletApiService);

  ngOnInit(): void {
    // Utiliser un numéro de test
    this.balanceStore.refresh('+221770000001');
  }
}