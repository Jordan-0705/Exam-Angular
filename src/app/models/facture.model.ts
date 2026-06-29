// src/app/models/facture.model.ts
export interface Facture {
  id: number;
  walletCode: string;
  provider: string;
  reference: string;
  amount: number;
  dueDate: Date;
  status: 'UNPAID' | 'PAID';
  createdAt: Date;
}