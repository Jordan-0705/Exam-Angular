// models/wallet.model.ts
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

// models/transaction.model.ts
export interface Transaction {
  id: number;
  walletId: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER' | 'PAYMENT';
  amount: number;
  fee: number;
  reference: string;
  description: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: Date;
}

export interface TransferRequest {
  senderPhone: string;
  receiverPhone: string;
  amount: number;
}

export interface DepositRequest {
  amount: number;
  paymentMethod: string;
}

export interface WithdrawRequest {
  phoneNumber: string;
  amount: number;
}

// models/facture.model.ts
export interface Facture {
  id: number;
  walletCode: string;
  provider: 'ISM' | 'WOYAFAL' | 'SENELEC' | 'SONATEL';
  reference: string;
  amount: number;
  dueDate: Date;
  status: 'UNPAID' | 'PAID';
  createdAt: Date;
}

export interface BillPaymentRequest {
  phoneNumber: string;
  serviceName: string;
  amount?: number;
}

export interface SpecificBillPaymentRequest {
  phoneNumber: string;
  serviceName: string;
  factureReferences: string[];
}