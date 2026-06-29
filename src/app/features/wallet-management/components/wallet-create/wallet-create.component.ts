// features/wallet-management/components/wallet-create/wallet-create.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WalletApiService } from '@core/services/wallet-api.service';
import { phoneValidator } from '@shared/validators/phone.validator';

@Component({
  selector: 'app-wallet-create',
  standalone: true,
  template: `
    <div class="wallet-create-container">
      <h2>Créer un nouveau portefeuille</h2>
      
      <form [formGroup]="walletForm" (ngSubmit)="onSubmit()">
        <!-- Phone Number -->
        <div class="form-group">
          <label>Numéro de téléphone *</label>
          <input 
            type="text" 
            formControlName="phoneNumber"
            placeholder="+221 77 123 45 67"
          />
          <div class="error" *ngIf="walletForm.get('phoneNumber')?.invalid && walletForm.get('phoneNumber')?.touched">
            Numéro de téléphone invalide. Format: +22177XXXXXXXX
          </div>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label>Email *</label>
          <input 
            type="email" 
            formControlName="email"
            placeholder="email@exemple.com"
          />
          <div class="error" *ngIf="walletForm.get('email')?.invalid && walletForm.get('email')?.touched">
            Email invalide
          </div>
        </div>

        <!-- Code -->
        <div class="form-group">
          <label>Code du portefeuille *</label>
          <input 
            type="text" 
            formControlName="code"
            placeholder="WLT-0000001"
          />
          <div class="error" *ngIf="walletForm.get('code')?.invalid && walletForm.get('code')?.touched">
            Code requis
          </div>
        </div>

        <!-- Initial Balance -->
        <div class="form-group">
          <label>Solde initial</label>
          <input 
            type="number" 
            formControlName="initialBalance"
            placeholder="0"
            min="0"
            step="100"
          />
        </div>

        <!-- Currency -->
        <div class="form-group">
          <label>Devise</label>
          <select formControlName="currency">
            <option value="XOF">XOF - Franc CFA</option>
            <option value="EUR">EUR - Euro</option>
            <option value="USD">USD - Dollar US</option>
          </select>
        </div>

        <!-- Submit -->
        <div class="form-actions">
          <button type="button" (click)="onCancel()" class="btn-secondary">
            Annuler
          </button>
          <button type="submit" [disabled]="walletForm.invalid" class="btn-primary">
            Créer le portefeuille
          </button>
        </div>
      </form>

      <!-- Loading -->
      <app-loading-spinner *ngIf="loading"></app-loading-spinner>
    </div>
  `,
  styles: [`
    .wallet-create-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    .form-group input, .form-group select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .error {
      color: #dc3545;
      font-size: 14px;
      margin-top: 5px;
    }
    .form-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 20px;
    }
    .btn-primary {
      background: #007bff;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-secondary {
      background: #6c757d;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class WalletCreateComponent {
  walletForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private walletApi: WalletApiService,
    private router: Router
  ) {
    this.walletForm = this.fb.group({
      phoneNumber: ['', [Validators.required, phoneValidator()]],
      email: ['', [Validators.required, Validators.email]],
      code: ['', Validators.required],
      initialBalance: [0, [Validators.min(0)]],
      currency: ['XOF']
    });
  }

  onSubmit(): void {
    if (this.walletForm.invalid) return;

    this.loading = true;
    this.walletApi.createWallet(this.walletForm.value).subscribe({
      next: (wallet) => {
        this.loading = false;
        // Show success toast
        // Navigate to wallet list
        this.router.navigate(['/admin/wallets']);
      },
      error: (error) => {
        this.loading = false;
        // Show error toast
        console.error('Failed to create wallet', error);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/wallets']);
  }
}