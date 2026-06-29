// features/client-dashboard/components/transfer/transfer.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WalletApiService } from '@core/services/wallet-api.service';
import { BalanceStore } from '@core/services/balance-store.service';
import { ToastService } from '@core/services/toast.service';
import { phoneValidator } from '@shared/validators/phone.validator';
import { differentPhoneValidator } from '@shared/validators/different-phone.validator';

@Component({
  selector: 'app-transfer',
  standalone: true,
  template: `
    <div class="transfer-container">
      <h2>Transfert d'Argent</h2>
      
      <form [formGroup]="transferForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Numéro du destinataire *</label>
          <input 
            type="text" 
            formControlName="destination"
            placeholder="+221 77 123 45 67"
          />
          <div class="error" *ngIf="transferForm.get('destination')?.invalid && transferForm.get('destination')?.touched">
            <span *ngIf="transferForm.get('destination')?.errors?.['required']">
              Numéro requis
            </span>
            <span *ngIf="transferForm.get('destination')?.errors?.['invalidPhone']">
              Format invalide. Utilisez +22177XXXXXXXX
            </span>
          </div>
        </div>

        <div class="form-group">
          <label>Montant à transférer *</label>
          <div class="input-with-currency">
            <input 
              type="number" 
              formControlName="amount"
              placeholder="0"
              min="1"
              step="100"
            />
            <span class="currency">XOF</span>
          </div>
          <div class="error" *ngIf="transferForm.get('amount')?.invalid && transferForm.get('amount')?.touched">
            <span *ngIf="transferForm.get('amount')?.errors?.['required']">
              Montant requis
            </span>
            <span *ngIf="transferForm.get('amount')?.errors?.['min']">
              Le montant doit être supérieur à 0
            </span>
            <span *ngIf="transferForm.get('amount')?.errors?.['insufficientBalance']">
              Solde insuffisant
            </span>
          </div>
        </div>

        <div class="form-group">
          <label>Description</label>
          <input 
            type="text" 
            formControlName="description"
            placeholder="Motif du transfert"
          />
        </div>

        <!-- Form Error Messages -->
        <div class="form-error" *ngIf="transferForm.errors?.['samePhone']">
          ⚠️ Vous ne pouvez pas transférer vers votre propre numéro
        </div>

        <div class="form-summary" *ngIf="showSummary">
          <p>Transfert de <strong>{{ transferForm.get('amount')?.value | xof }}</strong></p>
          <p>Vers : <strong>{{ transferForm.get('destination')?.value | phoneFormat }}</strong></p>
        </div>

        <div class="form-actions">
          <button type="button" (click)="onCancel()" class="btn-secondary">
            Annuler
          </button>
          <button type="submit" [disabled]="transferForm.invalid || loading" class="btn-primary">
            <span *ngIf="loading">Transfert en cours...</span>
            <span *ngIf="!loading">Effectuer le transfert</span>
          </button>
        </div>
      </form>

      <app-loading-spinner *ngIf="loading"></app-loading-spinner>
    </div>
  `,
  styles: [`
    .transfer-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 25px;
    }
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }
    .form-group input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
      transition: border-color 0.3s;
    }
    .form-group input:focus {
      outline: none;
      border-color: #007bff;
    }
    .form-group input.ng-invalid.ng-touched {
      border-color: #dc3545;
    }
    .input-with-currency {
      position: relative;
    }
    .input-with-currency input {
      padding-right: 60px;
    }
    .currency {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #6c757d;
      font-weight: 500;
    }
    .error {
      color: #dc3545;
      font-size: 14px;
      margin-top: 5px;
    }
    .form-error {
      background: #f8d7da;
      color: #721c24;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 20px;
    }
    .form-summary {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      margin-bottom: 20px;
    }
    .form-actions {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
      margin-top: 30px;
    }
    .btn-primary, .btn-secondary {
      padding: 12px 30px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }
    .btn-primary {
      background: #007bff;
      color: white;
    }
    .btn-primary:hover:not(:disabled) {
      background: #0056b3;
    }
    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    .btn-secondary:hover {
      background: #5a6268;
    }
  `]
})
export class TransferComponent {
  private fb = inject(FormBuilder);
  private walletApi = inject(WalletApiService);
  private balanceStore = inject(BalanceStore);
  private toast = inject(ToastService);
  private router = inject(Router);
  
  currentPhone = '+221778899001'; // À remplacer par le vrai numéro
  loading = false;
  showSummary = false;

  transferForm = this.fb.group({
    destination: ['', [Validators.required, phoneValidator()]],
    amount: [null, [Validators.required, Validators.min(1)]],
    description: ['']
  }, { 
    validators: [differentPhoneValidator(this.currentPhone)]
  });

  constructor() {
    // Show summary when both fields are filled
    this.transferForm.valueChanges.subscribe(() => {
      this.showSummary = 
        this.transferForm.get('destination')?.valid && 
        this.transferForm.get('amount')?.valid &&
        this.transferForm.get('amount')?.value > 0;
    });
  }

  onSubmit(): void {
    if (this.transferForm.invalid) return;

    this.loading = true;
    const transferRequest = {
      senderPhone: this.currentPhone,
      receiverPhone: this.transferForm.get('destination')?.value,
      amount: this.transferForm.get('amount')?.value
    };

    this.walletApi.transfer(transferRequest).subscribe({
      next: (transaction) => {
        this.loading = false;
        this.toast.show('Transfert effectué avec succès !', 'success');
        
        // Refresh balance
        this.balanceStore.refreshBalance(this.currentPhone);
        
        // Navigate to dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        const message = error.error?.message || 'Erreur lors du transfert';
        this.toast.show(message, 'error');
        console.error('Transfer failed', error);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}