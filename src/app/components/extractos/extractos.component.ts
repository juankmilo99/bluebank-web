import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MovementDto} from "../../models/movement.model";
import {MovementService} from "../../services/movement.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-extractos',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './extractos.component.html',
  styleUrl: './extractos.component.css'
})
export class ExtractosComponent {
  movimientosForm!: FormGroup;
  movimientos: MovementDto[] = [];

  constructor(private fb: FormBuilder, private apiService: MovementService) {}

  ngOnInit() {
    this.movimientosForm = this.fb.group({
      documentNumber: ['', Validators.required],
      month: [1, Validators.required],
      year: [2024, Validators.required]
    });
  }

  consultarMovimientos() {
    if (this.movimientosForm.invalid) {
      return;
    }

    const { documentNumber, month, year } = this.movimientosForm.value;

    this.apiService.getMonthlyStatement(documentNumber, month, year).subscribe(
      (movimientos: MovementDto[]) => {
        this.movimientos = movimientos;
      },
      (error) => {
        console.error('Error al obtener movimientos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener extractos',
          text: error.error.messages[0],
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
