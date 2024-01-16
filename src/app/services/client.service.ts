import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ClientTransactionCountDto, ClientWithdrawalDto} from "../models/transactions.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = `${environment.apiUrl}/api/v1/client`;

  constructor(private http: HttpClient) {}

  getMaxTransactions(month: number, year: number): Observable<ClientTransactionCountDto[]> {
    const params = new HttpParams()
      .set('month', month.toString())
      .set('year', year.toString());

    return this.http.get<ClientTransactionCountDto[]>(`${this.baseUrl}/max-transactions`, { params });
  }

  getOtherCityWithdrawals(): Observable<ClientWithdrawalDto[]> {
    return this.http.get<ClientWithdrawalDto[]>(`${this.baseUrl}/other-city`);
  }
}
