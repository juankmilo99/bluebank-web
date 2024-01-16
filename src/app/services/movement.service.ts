import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovementDto } from '../models/movement.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  private baseUrl = `${environment.apiUrl}/api/v1/movements`;

  constructor(private http: HttpClient) {}

  getRecentMovements(documentNumber: string): Observable<MovementDto[]> {
    const params = new HttpParams().set('documentNumber', documentNumber);
    return this.http.get<MovementDto[]>(`${this.baseUrl}/recent`, { params });
  }

  getMonthlyStatement(documentNumber: string, month: number, year: number): Observable<MovementDto[]> {
    const params = new HttpParams()
      .set('documentNumber', documentNumber)
      .set('month', month.toString())
      .set('year', year.toString());

    return this.http.get<MovementDto[]>(`${this.baseUrl}/statement`, { params });
  }
}
