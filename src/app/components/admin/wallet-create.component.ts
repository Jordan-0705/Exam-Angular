// src/app/components/admin/wallet-create.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WalletApiService } from '../../services/wallet-api.service';
import { phoneValidator } from '../../validators/phone.validator';

@Component({
  selector: 'app-wallet-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Ajout de CommonModule
  template: `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1>➕ Créer un Portefeuille</h1>
      
      <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <form [formGroup]="walletForm" (ngSubmit)="onSubmit()">
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Numéro de téléphone *</label>
            <input type="text" formControlName="phoneNumber" placeholder="+221 77 123 45 67"
                   style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
            <div style="color: #dc3545; font-size: 14px; margin-top: 5px;" 
                 *ngIf="walletForm.get('phoneNumber')?.invalid && walletForm.get('phoneNumber')?.touched">
              Format invalide. Utilisez +22177XXXXXXXX
            </div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Email *</label>
            <input type="email" formControlName="email" placeholder="email@exemple.com"
                   style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
          </div>
          
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Code du portefeuille *</label>
            <input type="text" formControlName="code" placeholder="WLT-0000001"
                   style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
          </div>
          
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Solde initial</label>
            <input type="number" formControlName="initialBalance" placeholder="0" min="0"
                   style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
          </div>
          
          <div style="display: flex; gap: 10px; justify-content: flex-end;">
            <button type="button" (click)="onCancel()"
                    style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
              Annuler
            </button>
            <button type="submit" [disabled]="walletForm.invalid || loading"
                    style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
              {{ loading ? 'Création...' : 'Créer le portefeuille' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class WalletCreateComponent {
  private fb = inject(FormBuilder);
  private walletApi = inject(WalletApiService);
  private router = inject(Router);
  loading = false;

  walletForm = this.fb.group({
    phoneNumber: ['', [Validators.required, phoneValidator()]],
    email: ['', [Validators.required, Validators.email]],
    code: ['', Validators.required],
    initialBalance: [0, [Validators.min(0)]],
    currency: ['XOF']
  });

  onSubmit(): void {
    if (this.walletForm.invalid) return;
    this.loading = true;
    this.walletApi.createWallet(this.walletForm.value as any).subscribe({
      next: () => {
        this.loading = false;
        alert('✅ Portefeuille créé avec succès !');
        this.router.navigate(['/admin/wallets']);
      },
      error: (err) => {
        this.loading = false;
        alert('❌ Erreur: ' + (err.error?.message || 'Impossible de créer le portefeuille'));
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/wallets']);
  }
}