import { Routes } from '@angular/router';

// app.routes.ts
export const routes: Routes = [
  // Routes publiques
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  // Routes protégées (authentification requise)
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      // Routes Client
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [RoleGuard],
        data: { roles: ['CLIENT'] }
      },
      {
        path: 'transactions',
        component: TransactionHistoryComponent,
        canActivate: [RoleGuard],
        data: { roles: ['CLIENT'] }
      },
      {
        path: 'transfer',
        component: TransferComponent,
        canActivate: [RoleGuard],
        data: { roles: ['CLIENT'] }
      },
      {
        path: 'bills',
        children: [
          { path: 'current', component: CurrentBillsComponent },
          { path: 'history', component: BillHistoryComponent }
        ],
        canActivate: [RoleGuard],
        data: { roles: ['CLIENT'] }
      },
      
      // Routes Agent
      {
        path: 'admin/wallets',
        component: WalletListComponent,
        canActivate: [RoleGuard],
        data: { roles: ['AGENT'] }
      },
      {
        path: 'admin/wallets/create',
        component: WalletCreateComponent,
        canActivate: [RoleGuard],
        data: { roles: ['AGENT'] }
      },
      {
        path: 'admin/wallets/search',
        component: WalletSearchComponent,
        canActivate: [RoleGuard],
        data: { roles: ['AGENT'] }
      }
    ]
  },
  
  // Route 404
  { path: '**', component: NotFoundComponent }
];
