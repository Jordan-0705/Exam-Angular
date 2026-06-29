// core/services/billing-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Facture } from '@app/models';

@Injectable({ providedIn: 'root' })
export class BillingApiService {
  private readonly BASE_URL = `${environment.apiUrl}/api/external/factures`;

  constructor(private http: HttpClient) {}

  // 2.2 Get current unpaid bills
  getCurrentBills(walletCode: string): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.BASE_URL}/${walletCode}/current`);
  }

  // 2.3 Get current unpaid bills by provider
  getCurrentBillsByProvider(walletCode: string, provider: string): Observable<Facture[]> {
    const params = new HttpParams().set('unite', provider);
    return this.http.get<Facture[]>(`${this.BASE_URL}/${walletCode}/current`, { params });
  }

  // 2.4 Get bills by period
  getBillsByPeriod(walletCode: string, startDate: string, endDate: string): Observable<Facture[]> {
    const params = new HttpParams()
      .set('debut', startDate)
      .set('fin', endDate);
    return this.http.get<Facture[]>(`${this.BASE_URL}/${walletCode}/periode`, { params });
  }
}