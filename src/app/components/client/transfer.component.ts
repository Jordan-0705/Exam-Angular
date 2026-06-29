// src/app/components/client/transfer.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WalletApiService } from '../../services/wallet-api.service';
import { BalanceStore } from '../../services/balance-store.service';
import { phoneValidator } from '../../validators/phone.validator';
import { differentPhoneValidator } from '../../validators/different-phone.validator';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1>💰 Transfert d'Argent</h1>
      
      <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <form [formGroup]="transferForm" (ngSubmit)="onSubmit()">
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">
              Numéro du destinataire *
            </label>
            <input 
              type="text" 
              formControlName="destination" 
              placeholder="77 000 00 01"
              [style.border-color]="getDestinationBorderColor()"
              style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
            
            <div style="color: #dc3545; font-size: 14px; margin-top: 5px;" 
                 *ngIf="isDestinationInvalid()">
              ⚠️ Numéro invalide. Exemples: 770000001 ou +221770000001
            </div>
            
            <div style="color: #28a745; font-size: 14px; margin-top: 5px;" 
                 *ngIf="isDestinationValid()">
              ✅ Numéro valide
            </div>
            
            <div style="color: #6c757d; font-size: 12px; margin-top: 5px;">
              💡 Formats acceptés: 770000001, 221770000001, +221770000001
            </div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Montant *</label>
            <input type="number" formControlName="amount" placeholder="0" min="1" step="100"
                   style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
            <div style="color: #dc3545; font-size: 14px; margin-top: 5px;" 
                 *ngIf="isAmountInvalid()">
              Le montant doit être supérieur à 0
            </div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Description</label>
            <input type="text" formControlName="description" placeholder="Motif du transfert"
                   style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
          </div>
          
          <div style="color: #721c24; background: #f8d7da; padding: 12px; border-radius: 6px; margin-bottom: 20px;" 
               *ngIf="hasSamePhoneError()">
            ⚠️ Vous ne pouvez pas transférer vers votre propre numéro
          </div>
          
          <div style="color: #155724; background: #d4edda; padding: 12px; border-radius: 6px; margin-bottom: 20px;" 
               *ngIf="isFormValid()">
            💡 Transfert de {{ getAmount() }} XOF vers {{ getDestination() }}
          </div>
          
          <button type="submit" [disabled]="transferForm.invalid || loading"
                  style="background: #007bff; color: white; border: none; padding: 12px 30px; 
                         border-radius: 6px; font-weight: 600; cursor: pointer; width: 100%;
                         opacity: {{ transferForm.invalid ? 0.6 : 1 }};">
            {{ loading ? '⏳ Transfert en cours...' : '💰 Effectuer le transfert' }}
          </button>
        </form>
      </div>
    </div>
  `
})
export class TransferComponent {
  private fb = inject(FormBuilder);
  private walletApi = inject(WalletApiService);
  private balanceStore = inject(BalanceStore);
  private router = inject(Router);
  
  currentPhone = '+221770000001';
  loading = false;

  transferForm = this.fb.group({
    destination: ['', [Validators.required, phoneValidator()]],
    amount: [null, [Validators.required, Validators.min(1)]],
    description: ['']
  }, { validators: [differentPhoneValidator(this.currentPhone)] });

  // Méthodes helper pour le template
  getDestinationControl() {
    return this.transferForm.get('destination');
  }

  getAmountControl() {
    return this.transferForm.get('amount');
  }

  isDestinationInvalid(): boolean {
    const control = this.getDestinationControl();
    return !!(control?.invalid && control?.touched);
  }

  isDestinationValid(): boolean {
    const control = this.getDestinationControl();
    return !!(control?.valid && control?.dirty);
  }

  getDestinationBorderColor(): string {
    const control = this.getDestinationControl();
    if (control?.valid && control?.dirty) return '#28a745';
    if (control?.invalid && control?.touched) return '#dc3545';
    return '#ddd';
  }

  isAmountInvalid(): boolean {
    const control = this.getAmountControl();
    return !!(control?.invalid && control?.touched);
  }

  hasSamePhoneError(): boolean {
    return !!this.transferForm.errors?.['samePhone'];
  }

  isFormValid(): boolean {
    return this.transferForm.valid && (this.getAmount() > 0);
  }

  getAmount(): number {
    return this.transferForm.get('amount')?.value || 0;
  }

  getDestination(): string {
    return this.transferForm.get('destination')?.value || '';
  }

  onSubmit(): void {
    if (this.transferForm.invalid) return;

    this.loading = true;
    let destination = this.getDestination();
    
    // Normaliser le numéro
    destination = destination.replace(/\s/g, '');
    if (!destination.startsWith('+')) {
      if (/^77[0-9]{7}$/.test(destination)) {
        destination = '+221' + destination;
      } else if (/^22177[0-9]{7}$/.test(destination)) {
        destination = '+' + destination;
      }
    }
    
    const request = {
      senderPhone: this.currentPhone,
      receiverPhone: destination,
      amount: this.getAmount()
    };

    this.walletApi.transfer(request).subscribe({
      next: () => {
        this.loading = false;
        alert('✅ Transfert effectué avec succès !');
        this.balanceStore.refresh(this.currentPhone);
        this.transferForm.reset();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        alert('❌ Erreur: ' + (err.error?.message || 'Solde insuffisant'));
      }
    });
  }
}