// src/app/models/transaction.model.ts
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