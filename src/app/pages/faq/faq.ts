import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-faq',

  standalone: true,

  imports: [
    CommonModule,
    MatExpansionModule
  ],

  templateUrl: './faq.html',

  styleUrl: './faq.css'
})

export class Faq implements OnInit {

  preguntas = [

    {
      pregunta: '¿Cuántas horas necesito?',
      respuesta: 'Debes cumplir las horas establecidas por tu institución.'
    },

    {
      pregunta: '¿Puedo hacerlo con familiares?',
      respuesta: 'Depende de las políticas de la dependencia receptora.'
    },

    {
      pregunta: '¿Cuál es la duración mínima?',
      respuesta: 'La duración depende de los lineamientos institucionales.'
    }

  ];

  ngOnInit(): void {

    const nuevasPreguntas = JSON.parse(
      localStorage.getItem('faq_nuevas') || '[]'
    );

    this.preguntas = [
      ...this.preguntas,
      ...nuevasPreguntas
    ];

  }

}