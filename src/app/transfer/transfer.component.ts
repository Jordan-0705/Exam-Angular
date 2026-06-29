// src/app/transfer/transfer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-transfer',
  standalone: true,
  template: `
    <div style="max-width: 600px; margin: 0 auto;">
      <h1>💰 Transfert d'Argent</h1>
      
      <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 500;">Numéro du destinataire</label>
          <input type="text" placeholder="+221 77 123 45 67" 
                 style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
        </div>
        
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 500;">Montant</label>
          <input type="number" placeholder="0" 
                 style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
        </div>
        
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 500;">Description</label>
          <input type="text" placeholder="Motif du transfert" 
                 style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
        </div>
        
        <button style="background: #007bff; color: white; border: none; padding: 12px 30px; 
                       border-radius: 6px; font-weight: 600; cursor: pointer; width: 100%;">
          Effectuer le transfert
        </button>
      </div>
    </div>
  `
})
export class TransferComponent {}