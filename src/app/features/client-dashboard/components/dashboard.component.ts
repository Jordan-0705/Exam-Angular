// features/client-dashboard/components/dashboard/dashboard.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BalanceStore } from '@core/services/balance-store.service';
import { WalletApiService } from '@core/services/wallet-api.service';
import { XofPipe } from '@shared/pipes/xof.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, XofPipe],
  template: `
    <div class="dashboard-container">
      <!-- Balance Card -->
      <div class="balance-card">
        <div class="balance-header">
          <h3>Solde Disponible</h3>
          <span class="phone">{{ currentPhone | phoneFormat }}</span>
        </div>
        <div class="balance-amount">
          {{ balanceStore.balance() | xof }}
        </div>
        <div class="balance-actions">
          <button routerLink="/transfer" class="btn-transfer">
            <i class="fas fa-exchange-alt"></i> Transfert
          </button>
          <button routerLink="/bills/current" class="btn-bills">
            <i class="fas fa-file-invoice"></i> Payer Factures
          </button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="quick-stats">
        <div class="stat-card">
          <i class="fas fa-arrow-up income"></i>
          <div>
            <span class="stat-value">{{ totalIncome | xof }}</span>
            <span class="stat-label">Revenus (30j)</span>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-arrow-down expense"></i>
          <div>
            <span class="stat-value">{{ totalExpenses | xof }}</span>
            <span class="stat-label">Dépenses (30j)</span>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-list"></i>
          <div>
            <span class="stat-value">{{ transactionCount }}</span>
            <span class="stat-label">Transactions</span>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="recent-transactions">
        <h3>Dernières Transactions</h3>
        <div class="transaction-list">
          <div *ngFor="let transaction of recentTransactions" class="transaction-item">
            <div class="transaction-icon" [class]="transaction.type.toLowerCase()">
              <i [class]="getIcon(transaction.type)"></i>
            </div>
            <div class="transaction-details">
              <span class="transaction-description">{{ transaction.description }}</span>
              <span class="transaction-date">{{ transaction.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
            </div>
            <div class="transaction-amount" [class.negative]="isNegative(transaction)">
              {{ transaction.amount | xof }}
            </div>
          </div>
        </div>
        <button routerLink="/transactions" class="btn-view-all">
          Voir tout l'historique
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .balance-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 16px;
      margin-bottom: 30px;
    }
    .balance-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .balance-header h3 {
      margin: 0;
      font-weight: 400;
    }
    .balance-amount {
      font-size: 48px;
      font-weight: 700;
      margin: 15px 0;
    }
    .balance-actions {
      display: flex;
      gap: 15px;
      margin-top: 20px;
    }
    .btn-transfer, .btn-bills {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }
    .btn-transfer {
      background: rgba(255,255,255,0.2);
      color: white;
    }
    .btn-transfer:hover {
      background: rgba(255,255,255,0.3);
    }
    .btn-bills {
      background: #f8f9fa;
      color: #333;
    }
    .quick-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .stat-card i {
      font-size: 32px;
    }
    .stat-card .income { color: #28a745; }
    .stat-card .expense { color: #dc3545; }
    .stat-value {
      display: block;
      font-size: 24px;
      font-weight: 600;
    }
    .stat-label {
      font-size: 14px;
      color: #6c757d;
    }
    .recent-transactions {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .transaction-item {
      display: flex;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .transaction-item:last-child {
      border-bottom: none;
    }
    .transaction-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
    }
    .transaction-icon.deposit { background: #d4edda; color: #155724; }
    .transaction-icon.withdrawal { background: #f8d7da; color: #721c24; }
    .transaction-icon.transfer { background: #cce5ff; color: #004085; }
    .transaction-icon.payment { background: #fff3cd; color: #856404; }
    .transaction-details {
      flex: 1;
    }
    .transaction-description {
      display: block;
      font-weight: 500;
    }
    .transaction-date {
      font-size: 12px;
      color: #6c757d;
    }
    .transaction-amount {
      font-weight: 600;
      color: #28a745;
    }
    .transaction-amount.negative {
      color: #dc3545;
    }
    .btn-view-all {
      width: 100%;
      padding: 12px;
      margin-top: 15px;
      background: #f8f9fa;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
    }
    .btn-view-all:hover {
      background: #e9ecef;
    }
  `]
})
export class DashboardComponent implements OnInit {
  balanceStore = inject(BalanceStore);
  private walletApi = inject(WalletApiService);
  
  currentPhone = '+221778899001'; // À remplacer par le vrai numéro
  totalIncome = 0;
  totalExpenses = 0;
  transactionCount = 0;
  recentTransactions: any[] = [];

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Refresh balance
    this.balanceStore.refreshBalance(this.currentPhone);

    // Load transactions
    this.walletApi.getTransactionHistory(this.currentPhone).subscribe({
      next: (transactions) => {
        this.recentTransactions = transactions.slice(0, 5);
        this.transactionCount = transactions.length;
        
        // Calculate income/expenses
        this.totalIncome = transactions
          .filter(t => ['DEPOSIT', 'TRANSFER_IN'].includes(t.type))
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);
          
        this.totalExpenses = transactions
          .filter(t => ['WITHDRAWAL', 'TRANSFER_OUT', 'PAYMENT'].includes(t.type))
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      },
      error: (error) => console.error('Failed to load transactions', error)
    });
  }

  getIcon(type: string): string {
    const icons: Record<string, string> = {
      'DEPOSIT': 'fas fa-arrow-down',
      'WITHDRAWAL': 'fas fa-arrow-up',
      'TRANSFER': 'fas fa-exchange-alt',
      'PAYMENT': 'fas fa-credit-card'
    };
    return icons[type] || 'fas fa-circle';
  }

  isNegative(transaction: any): boolean {
    return ['WITHDRAWAL', 'TRANSFER', 'PAYMENT'].includes(transaction.type);
  }
}