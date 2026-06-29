// core/services/wallet-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { 
  Wallet, 
  WalletRequest, 
  Transaction, 
  TransferRequest,
  DepositRequest,
  WithdrawRequest,
  BillPaymentRequest,
  SpecificBillPaymentRequest
} from '@app/models';

@Injectable({ providedIn: 'root' })
export class WalletApiService {
  private readonly BASE_URL = `${environment.apiUrl}/api/wallets`;

  constructor(private http: HttpClient) {}

  // 1.1 Seed database
  seedWallets(numWallets: number, eventsPerWallet: number): Observable<string> {
    const params = new HttpParams()
      .set('numWallets', numWallets.toString())
      .set('eventsPerWallet', eventsPerWallet.toString());
    return this.http.post<string>(`${this.BASE_URL}/seed`, null, { params });
  }

  // 1.2 Create wallet
  createWallet(walletRequest: WalletRequest): Observable<Wallet> {
    return this.http.post<Wallet>(this.BASE_URL, walletRequest);
  }

  // 1.3 List wallets (paginated)
  getWallets(page: number = 0, size: number = 10): Observable<{ content: Wallet[], totalElements: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<{ content: Wallet[], totalElements: number }>(this.BASE_URL, { params });
  }

  // 1.4 Get wallet by phone
  getWalletByPhone(phone: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.BASE_URL}/${phone}`);
  }

  // 1.5 Get balance
  getBalance(phone: string): Observable<number> {
    return this.http.get<number>(`${this.BASE_URL}/${phone}/balance`);
  }

  // 1.6 Deposit
  deposit(walletId: number, depositRequest: DepositRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.BASE_URL}/${walletId}/deposit`, depositRequest);
  }

  // 1.7 Withdraw
  withdraw(withdrawRequest: WithdrawRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.BASE_URL}/withdraw`, withdrawRequest);
  }

  // 1.8 Transfer
  transfer(transferRequest: TransferRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.BASE_URL}/transfer`, transferRequest);
  }

  // 1.9 Pay current month bill
  payCurrentBill(paymentRequest: BillPaymentRequest): Observable<string> {
    return this.http.post<string>(`${this.BASE_URL}/pay`, paymentRequest);
  }

  // 1.10 Pay specific bills
  paySpecificBills(paymentRequest: SpecificBillPaymentRequest): Observable<string> {
    return this.http.post<string>(`${this.BASE_URL}/pay-factures`, paymentRequest);
  }

  // 1.11 Get transaction history
  getTransactionHistory(phone: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.BASE_URL}/${phone}/transactions`);
  }
}