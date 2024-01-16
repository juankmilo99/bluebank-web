import { Component } from '@angular/core';
import {MovementRequest} from "../../models/transactions.model";
import {SuccessResponse} from "../../models/success-response.model";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TransactionService} from "../../services/transaction.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-transaccion',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './transaccion.component.html',
  styleUrl: './transaccion.component.css'
})
export class TransaccionComponent {
  transaccionForm!: FormGroup;
  transactionTypeOptions: string[] = ['deposit', 'withdrawal'];

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {}

  ngOnInit() {
    this.transaccionForm = this.fb.group({
      documentNumber: ['', Validators.required],
      cityName: [''],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      accountNumber: ['', Validators.required],
      transactionType: ['deposit', Validators.required]
    });
  }

  realizarTransaccion() {
    if (this.transaccionForm.invalid) {
      return;
    }

    const { documentNumber, cityName, amount, accountNumber, transactionType } = this.transaccionForm.value;
    const request: MovementRequest = { documentNumber, cityName, amount, accountNumber };

    this.transactionService.makeTransaction(request, transactionType).subscribe(
      (response: SuccessResponse) => {
        console.log('Transacción exitosa:', response);
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: "Transacción exitosa",
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
        this.transaccionForm.reset();
      },
      (error: any) => {
        console.error('Error al realizar la transacción:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al realizar transacción',
          text: error.error.messages[0],
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
