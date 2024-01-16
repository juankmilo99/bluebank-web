import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovementRequest } from '../models/transactions.model';
import { SuccessResponse } from '../models/success-response.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = `${environment.apiUrl}/api/v1/transactions`;

  constructor(private http: HttpClient) {}

  makeTransaction(request: MovementRequest, transactionType: string): Observable<SuccessResponse> {
    const endpoint = transactionType === 'deposit' ? 'deposit' : 'withdrawal';
    return this.http.post<SuccessResponse>(`${this.baseUrl}/${endpoint}`, request);
  }

  makeDeposit(request: MovementRequest): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${this.baseUrl}/deposit`, request);
  }

  makeWithdrawal(request: MovementRequest): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${this.baseUrl}/withdrawal`, request);
  }
}
