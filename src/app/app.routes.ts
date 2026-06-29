// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'transfer', loadComponent: () => import('./transfer/transfer.component').then(m => m.TransferComponent) },
  { path: 'wallets', loadComponent: () => import('./wallets/wallets.component').then(m => m.WalletsComponent) },
  { path: '**', redirectTo: 'home' }
];