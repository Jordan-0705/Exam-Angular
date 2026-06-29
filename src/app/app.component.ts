// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav style="background: #2c3e50; padding: 15px 20px; color: white;">
      <div style="display: flex; gap: 20px; align-items: center; max-width: 1200px; margin: 0 auto;">
        <h2 style="margin: 0;">🏦 BadWallet</h2>
        <a routerLink="/home" style="color: white; text-decoration: none;">Accueil</a>
        <a routerLink="/transfer" style="color: white; text-decoration: none;">Transfert</a>
        <a routerLink="/wallets" style="color: white; text-decoration: none;">Portefeuilles</a>
      </div>
    </nav>
    <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}