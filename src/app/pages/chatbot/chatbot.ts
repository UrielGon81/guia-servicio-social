import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css'
})

export class Chatbot {

  pregunta = '';

  mensajes = [
    {
      tipo: 'bot',
      texto: 'Hola 👋 ¿En qué puedo ayudarte?'
    }
  ];

  enviarPregunta() {

    const texto = this.pregunta.trim().toLowerCase();

    if (!texto) return;

    // MENSAJE DEL USUARIO

    this.mensajes.push({
      tipo: 'usuario',
      texto: this.pregunta
    });

    let respuesta = '';

    // RESPUESTAS INTELIGENTES

    if (
      texto.includes('informe') ||
      texto.includes('trimestral')
    ) {

      respuesta =
      'Debes ingresar al sistema SICDE y seleccionar el apartado de informes trimestrales.';

    }

    else if (
      texto.includes('registro') ||
      texto.includes('registrar')
    ) {

      respuesta =
      'Debes ingresar al portal SICDE y completar correctamente tu registro institucional.';

    }

    else if (
      texto.includes('documentos') ||
      texto.includes('formatos') ||
      texto.includes('requisitos')
    ) {

      respuesta =
      'Necesitas carta de aceptación, formato de inscripción y CURP.';

    }

    else if (
      texto.includes('liberacion') ||
      texto.includes('liberar')
    ) {

      respuesta =
      'Para liberar tu servicio social necesitas entregar todos tus informes y la carta de término.';

    }

    else if (
      texto.includes('hola') ||
      texto.includes('buenas')
    ) {

      respuesta =
      'Hola 👋 ¿En qué puedo ayudarte con tu servicio social?';

    }

    // SI NO ENCUENTRA RESPUESTA

    else {

      respuesta =
      'No encontré una respuesta 😢 Tu pregunta fue guardada para mejorar el chatbot.';

      // GUARDAR PREGUNTA NUEVA

      const preguntasGuardadas =
        JSON.parse(localStorage.getItem('preguntas_nuevas') || '[]');

      preguntasGuardadas.push({
        pregunta: this.pregunta,
        fecha: new Date()
      });

      localStorage.setItem(
        'preguntas_nuevas',
        JSON.stringify(preguntasGuardadas)
      );

    }

    // RESPUESTA BOT

    setTimeout(() => {

      this.mensajes.push({
        tipo: 'bot',
        texto: respuesta
      });

    }, 700);

    // LIMPIAR INPUT

    this.pregunta = '';

  }

}