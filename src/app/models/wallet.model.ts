// src/app/models/wallet.model.ts
export interface Wallet {
  id: number;
  phoneNumber: string;
  email: string;
  code: string;
  balance: number;
  currency: string;
  createdAt: Date;
}

export interface WalletRequest {
  phoneNumber: string;
  email: string;
  initialBalance?: number;
  code: string;
  currency?: string;
}