// src/app/services/wallet-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Wallet, 
  WalletRequest, 
  Transaction, 
  TransferRequest, 
  DepositRequest, 
  WithdrawRequest,
  BillPaymentRequest,
  SpecificBillPaymentRequest
} from '../models';

@Injectable({ providedIn: 'root' })
export class WalletApiService {
  private readonly BASE_URL = 'http://localhost:8080/api/wallets';

  constructor(private http: HttpClient) {}

  seedWallets(numWallets: number, eventsPerWallet: number): Observable<string> {
    const params = new HttpParams()
      .set('numWallets', numWallets.toString())
      .set('eventsPerWallet', eventsPerWallet.toString());
    return this.http.post<string>(`${this.BASE_URL}/seed`, null, { params });
  }

  createWallet(request: WalletRequest): Observable<Wallet> {
    return this.http.post<Wallet>(this.BASE_URL, request);
  }

  getWallets(page: number = 0, size: number = 10): Observable<{ content: Wallet[], totalElements: number }> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<{ content: Wallet[], totalElements: number }>(this.BASE_URL, { params });
  }

  getWalletByPhone(phone: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.BASE_URL}/${phone}`);
  }

  getBalance(phone: string): Observable<number> {
    return this.http.get<number>(`${this.BASE_URL}/${phone}/balance`);
  }

  deposit(walletId: number, request: DepositRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.BASE_URL}/${walletId}/deposit`, request);
  }

  withdraw(request: WithdrawRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.BASE_URL}/withdraw`, request);
  }

  transfer(request: TransferRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.BASE_URL}/transfer`, request);
  }

  payCurrentBill(request: BillPaymentRequest): Observable<string> {
    return this.http.post<string>(`${this.BASE_URL}/pay`, request);
  }

  paySpecificBills(request: SpecificBillPaymentRequest): Observable<string> {
    return this.http.post<string>(`${this.BASE_URL}/pay-factures`, request);
  }

  getTransactionHistory(phone: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.BASE_URL}/${phone}/transactions`);
  }
}