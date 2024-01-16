import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MovementService} from "../../services/movement.service";
import {MovementDto} from "../../models/movement.model";
import Swal from "sweetalert2";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-movimientos-recientes',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './movimientos-recientes.component.html',
  styleUrl: './movimientos-recientes.component.css'
})
export class MovimientosRecientesComponent {
  movimientosForm!: FormGroup;
  movimientos: MovementDto[] = [];

  constructor(private fb: FormBuilder, private apiService: MovementService) {}

  ngOnInit() {
    this.movimientosForm = this.fb.group({
      documentNumber: ['', Validators.required]
    });
  }

  consultarMovimientos() {
    if (this.movimientosForm.invalid) {
      return;
    }

    const { documentNumber } = this.movimientosForm.value;

    this.apiService.getRecentMovements(documentNumber).subscribe(
      (movimientos: MovementDto[]) => {
        this.movimientos = movimientos;
      },
      (error) => {
        console.error('Error al obtener movimientos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener movimientos',
          text: error.error.messages[0],
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
