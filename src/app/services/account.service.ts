import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BalanceResponse } from '../models/balance-response.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = `${environment.apiUrl}/api/v1/account`;

  constructor(private http: HttpClient) {}

  getBalance(documentNumber: string, accountNumber: number): Observable<BalanceResponse> {
    const params = new HttpParams()
      .set('documentNumber', documentNumber)
      .set('accountNumber', accountNumber.toString());

    return this.http.get<BalanceResponse>(`${this.baseUrl}/balance`, { params });
  }
}
