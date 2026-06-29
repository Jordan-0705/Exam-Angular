// src/app/services/billing-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../models';

@Injectable({ providedIn: 'root' })
export class BillingApiService {
  private readonly BASE_URL = 'http://localhost:8080/api/external/factures';

  constructor(private http: HttpClient) {}

  getCurrentBills(walletCode: string): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.BASE_URL}/${walletCode}/current`);
  }

  getCurrentBillsByProvider(walletCode: string, provider: string): Observable<Facture[]> {
    const params = new HttpParams().set('unite', provider);
    return this.http.get<Facture[]>(`${this.BASE_URL}/${walletCode}/current`, { params });
  }

  getBillsByPeriod(walletCode: string, debut: string, fin: string): Observable<Facture[]> {
    const params = new HttpParams().set('debut', debut).set('fin', fin);
    return this.http.get<Facture[]>(`${this.BASE_URL}/${walletCode}/periode`, { params });
  }
}