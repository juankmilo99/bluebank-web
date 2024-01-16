import { Component } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-saldo',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './consulta-saldo.component.html',
  styleUrl: './consulta-saldo.component.css'
})
export class ConsultaSaldoComponent {
  saldoForm?: FormGroup;
  saldoConsultado: boolean = false;
  saldo: number = 0;
  consultando = false;

  constructor(private fb: FormBuilder, private apiService: AccountService) {}

  ngOnInit() {
    this.saldoForm = this.fb.group({
      numeroCuenta: ['', Validators.required],
      numeroDocumento: ['', Validators.required]
    });
  }

  consultarSaldo() {
    if (this.saldoForm!.invalid) {
      return;
    }

    this.consultando = true;
    const { numeroCuenta, numeroDocumento } = this.saldoForm!.value;

    this.apiService.getBalance(numeroDocumento, numeroCuenta).subscribe(
      (response: any) => {
        this.consultando = false;
        this.saldo = response.balance;
        this.saldoConsultado = true;
      },
      (error) => {
        this.consultando = false;
        console.error('Error al consultar saldo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al consultar saldo',
          text: error.error.messages[0],
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    );
  }

}
