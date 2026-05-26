import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './chatbot.html',

  styleUrl: './chatbot.css'
})

export class Chatbot {

  pregunta = '';

  cargando = false;

  mensajes: any[] = [

    {
      tipo: 'bot',
      texto:
      'Bienvenido al asistente virtual de servicio social. ¿En qué puedo ayudarte?'
    }

  ];

  async enviarPregunta() {

    const texto =
    this.pregunta.trim().toLowerCase();

    if (!texto) return;

    // MENSAJE USUARIO

    this.mensajes.push({

      tipo: 'usuario',

      texto: this.pregunta

    });

    this.cargando = true;

    this.pregunta = '';

    // SIMULAR IA

    setTimeout(() => {

      let respuesta = '';

      // REGISTRO

      if (

        texto.includes('registro') ||
        texto.includes('registrar') ||
        texto.includes('sicde')

      ) {

        respuesta =
        'Para registrarte debes ingresar al sistema SICDE y completar correctamente tu información institucional.';

      }

      // INFORMES

      else if (

        texto.includes('informe') ||
        texto.includes('trimestral') ||
        texto.includes('evidencia')

      ) {

        respuesta =
        'Los informes trimestrales se suben en el apartado correspondiente dentro de SICDE.';

      }

      // DOCUMENTOS

      else if (

        texto.includes('documento') ||
        texto.includes('formato') ||
        texto.includes('requisito')

      ) {

        respuesta =
        'Necesitas carta de aceptación, formato de inscripción, CURP y seguro facultativo.';

      }

      // LIBERACIÓN

      else if (

        texto.includes('liberacion') ||
        texto.includes('liberar') ||
        texto.includes('termino')

      ) {

        respuesta =
        'Para liberar tu servicio social debes completar las horas requeridas y entregar la documentación final.';

      }

      // HORAS

      else if (

        texto.includes('horas')

      ) {

        respuesta =
        'El servicio social requiere cubrir las horas establecidas por tu institución educativa.';

      }

      // FECHAS

      else if (

        texto.includes('fecha') ||
        texto.includes('cuando')

      ) {

        respuesta =
        'Las fechas dependen de la convocatoria publicada por la institución.';

      }

      // SALUDO

      else if (

        texto.includes('hola') ||
        texto.includes('buenas') ||
        texto.includes('buen día')

      ) {

        respuesta =
        'Hola. ¿Cómo puedo ayudarte con tu servicio social?';

      }

      // DESPEDIDA

      else if (

        texto.includes('gracias')

      ) {

        respuesta =
        'Con gusto. Estoy para ayudarte.';

      }

      // DEFAULT

      else {

        respuesta =
        'No encontré información relacionada con tu pregunta. Tu consulta fue registrada para mejorar el sistema.';

        // GUARDAR PREGUNTAS NUEVAS

        const preguntas =
        JSON.parse(
          localStorage.getItem('preguntas_nuevas') || '[]'
        );

        preguntas.push({

          pregunta: texto,

          fecha: new Date()

        });

        localStorage.setItem(
          'preguntas_nuevas',
          JSON.stringify(preguntas)
        );

      }

      // RESPUESTA BOT

      this.mensajes.push({

        tipo: 'bot',

        texto: respuesta

      });

      this.cargando = false;

    }, 1000);

  }

}