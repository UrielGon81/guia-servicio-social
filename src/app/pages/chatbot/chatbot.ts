import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',

  standalone: true,

  imports: [
    FormsModule,
    CommonModule
  ],

  templateUrl: './chatbot.html',

  styleUrl: './chatbot.css'
})

export class Chatbot {

  pregunta = '';

  respuesta = '';

  responder() {

    const texto =
    this.pregunta.toLowerCase();

    if (
      texto.includes('horas')
    ) {

      this.respuesta =
      'Necesitas cumplir mínimo 480 horas de servicio social.';

    }

    else if (
      texto.includes('meses')
    ) {

      this.respuesta =
      'La duración mínima es de 6 meses.';

    }

    else if (
      texto.includes('familiares')
    ) {

      this.respuesta =
      'No puedes realizar servicio social con familiares.';

    }

    else if (
      texto.includes('creditos')
    ) {

      this.respuesta =
      'Debes tener cubierto el 50% de créditos.';

    }

    else {

      this.respuesta =
      'No encontré una respuesta. Consulta con el responsable de servicio social.';

    }

  }

}