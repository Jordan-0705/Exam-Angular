// src/app/wallets/wallets.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-wallets',
  standalone: true,
  template: `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h1>👛 Portefeuilles</h1>
        <button style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
          + Nouveau
        </button>
      </div>
      
      <div style="background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead style="background: #f8f9fa;">
            <tr>
              <th style="padding: 12px; text-align: left;">Code</th>
              <th style="padding: 12px; text-align: left;">Numéro</th>
              <th style="padding: 12px; text-align: left;">Email</th>
              <th style="padding: 12px; text-align: right;">Solde</th>
              <th style="padding: 12px; text-align: center;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6;"><strong>WLT-000001</strong></td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">+221 77 000 00 01</td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">user1[at]test.com</td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: right; color: #28a745;">75 000 XOF</td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: center;">
                <button style="background: #17a2b8; color: white; border: none; padding: 5px 10px; border-radius: 4px; margin: 0 5px; cursor: pointer;">👁️</button>
                <button style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; margin: 0 5px; cursor: pointer;">+</button>
                <button style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; margin: 0 5px; cursor: pointer;">-</button>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6;"><strong>WLT-000002</strong></td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">+221 77 000 00 02</td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">user2[at]test.com</td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: right; color: #28a745;">120 000 XOF</td>
              <td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: center;">
                <button style="background: #17a2b8; color: white; border: none; padding: 5px 10px; border-radius: 4px; margin: 0 5px; cursor: pointer;">👁️</button>
                <button style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; margin: 0 5px; cursor: pointer;">+</button>
                <button style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; margin: 0 5px; cursor: pointer;">-</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class WalletsComponent {}