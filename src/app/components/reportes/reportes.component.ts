import { Component } from '@angular/core';
import {ClientTransactionCountDto, ClientWithdrawalDto} from "../../models/transactions.model";
import {ClientService} from "../../services/client.service";
import Swal from "sweetalert2";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  reporte01Data: ClientTransactionCountDto[] = [];
  reporte02Data: ClientWithdrawalDto[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit() {}

  generarReporte01(month: number, year: number) {
    this.reporte01Data=[];
    this.reporte02Data=[];
    this.clientService.getMaxTransactions(month, year).subscribe(
      (data: ClientTransactionCountDto[]) => {
        this.reporte01Data = data;
      },
      (error) => {
        console.error('Error al obtener Reporte 01:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener reporte',
          text: error.error.messages[0],
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  generarReporte02() {
    this.reporte01Data=[];
    this.reporte02Data=[];
    this.clientService.getOtherCityWithdrawals().subscribe(
      (data: ClientWithdrawalDto[]) => {
        this.reporte02Data = data;
      },
      (error) => {
        console.error('Error al obtener Reporte 02:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener reporte',
          text: error.error.messages[0],
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
