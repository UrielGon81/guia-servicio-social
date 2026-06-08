import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './checklist.html',
  styleUrl: './checklist.css'
})
export class Checklist implements OnInit {

  pasos = [

    {
      nombre: 'Registro en SICDE',
      completado: false
    },

    {
      nombre: 'Formato de inscripción',
      completado: false
    },

    {
      nombre: 'Carta de aceptación',
      completado: false
    },

    {
      nombre: 'Informes trimestrales',
      completado: false
    },

    {
      nombre: 'Carta término',
      completado: false
    },

    {
      nombre: 'Liberación',
      completado: false
    }

  ];

  ngOnInit() {

    const datos =
    localStorage.getItem('checklist');

    if(datos){

      this.pasos = JSON.parse(datos);

    }

  }

  guardar() {

    localStorage.setItem(
      'checklist',
      JSON.stringify(this.pasos)
    );

  }

  get progreso(): number {

    const completados =
    this.pasos.filter(
      p => p.completado
    ).length;

    return (
      completados /
      this.pasos.length
    ) * 100;

  }

}