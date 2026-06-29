// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  // Routes Client
  { path: 'dashboard', loadComponent: () => import('./components/client/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'transfer', loadComponent: () => import('./components/client/transfer.component').then(m => m.TransferComponent) },
  { path: 'transactions', loadComponent: () => import('./components/client/transactions.component').then(m => m.TransactionsComponent) },
  { path: 'bills', loadComponent: () => import('./components/client/bills.component').then(m => m.BillsComponent) },
  
  // Routes Agent
  { path: 'admin/wallets', loadComponent: () => import('./components/admin/wallet-list.component').then(m => m.WalletListComponent) },
  { path: 'admin/wallets/create', loadComponent: () => import('./components/admin/wallet-create.component').then(m => m.WalletCreateComponent) },
  
  { path: '**', redirectTo: '/dashboard' }
];