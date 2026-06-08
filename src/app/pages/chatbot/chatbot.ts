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

  memoriaAlumno = {

    nombre: '',
    carrera: '',
    creditos: 0

  };

  mensajes: any[] = [

    {
      tipo: 'bot',
      texto:
      'Bienvenido al asistente virtual de servicio social. ¿Cuál es tu nombre?'
    }

  ];

  constructor(){

    const historial =
      localStorage.getItem('chat_historial');

    if(historial){

      this.mensajes =
        JSON.parse(historial);

    }

    const memoria =
      localStorage.getItem('memoria_alumno');

    if(memoria){

      this.memoriaAlumno =
        JSON.parse(memoria);

    }

  }

  guardarDatos(){

    localStorage.setItem(
      'chat_historial',
      JSON.stringify(this.mensajes)
    );

    localStorage.setItem(
      'memoria_alumno',
      JSON.stringify(this.memoriaAlumno)
    );

  }

  async enviarPregunta(){

    const texto =
      this.pregunta.trim();

    if(!texto) return;

    const textoLower =
      texto.toLowerCase();

    this.mensajes.push({

      tipo:'usuario',

      texto:texto

    });

    this.cargando = true;

    this.pregunta = '';

    setTimeout(() => {

      let respuesta = '';

      /* MEMORIA NOMBRE */

      if(
        textoLower.includes('me llamo') ||
        textoLower.includes('soy ')
      ){

        const nombre =
          texto.replace(/me llamo|soy/gi,'').trim();

        this.memoriaAlumno.nombre =
          nombre;

        respuesta =
          `Mucho gusto ${nombre}. Recordaré tu nombre para futuras consultas.`;

      }

      /* CARRERA */

      else if(
        textoLower.includes('ingenieria') ||
        textoLower.includes('licenciatura')
      ){

        this.memoriaAlumno.carrera =
          texto;

        respuesta =
          'He guardado tu carrera correctamente.';

      }

      /* CREDITOS */

      else if(
        textoLower.includes('%')
      ){

        const numero =
          parseInt(texto);

        if(!isNaN(numero)){

          this.memoriaAlumno.creditos =
            numero;

          if(numero >= 50){

            respuesta =
              `Tienes ${numero}% de créditos. Puedes iniciar tu servicio social.`;

          }else{

            respuesta =
              `Tienes ${numero}% de créditos. Aún necesitas alcanzar el 50%.`;

          }

        }

      }

      /* REGISTRO */

      else if(

        textoLower.includes('registro') ||
        textoLower.includes('registrar') ||
        textoLower.includes('sicde')

      ){

        respuesta =
        'Para registrarte debes ingresar al sistema SICDE y completar tu información institucional.';

      }

      /* REQUISITOS */

      else if(

        textoLower.includes('requisito') ||
        textoLower.includes('documento') ||
        textoLower.includes('formato')

      ){

        respuesta =
        'Necesitas formato de inscripción, carta de aceptación, CURP y seguro facultativo vigente.';

      }

      /* INFORMES */

      else if(

        textoLower.includes('informe') ||
        textoLower.includes('trimestral')

      ){

        respuesta =
        'Los informes trimestrales deben entregarse en los periodos establecidos por la institución.';

      }

      /* HORAS */

      else if(

        textoLower.includes('horas')

      ){

        respuesta =
        'El servicio social requiere cubrir al menos 480 horas.';

      }

      /* MEMORIA */

      else if(

        textoLower.includes('quien soy') ||
        textoLower.includes('recuerdas mi nombre')

      ){

        if(this.memoriaAlumno.nombre){

          respuesta =
          `Claro. Tu nombre es ${this.memoriaAlumno.nombre}.`;

        }else{

          respuesta =
          'Todavía no me has dicho tu nombre.';

        }

      }

      /* SALUDO */

      else if(

        textoLower.includes('hola') ||
        textoLower.includes('buenas')

      ){

        respuesta =
          this.memoriaAlumno.nombre
          ? `Hola ${this.memoriaAlumno.nombre}, ¿cómo puedo ayudarte?`
          : 'Hola, ¿cómo puedo ayudarte?';

      }

      /* DESPEDIDA */

      else if(

        textoLower.includes('gracias')

      ){

        respuesta =
          'Con gusto. Estoy para ayudarte.';

      }

      /* DEFAULT */

      else{

        respuesta =
          'No encontré información específica sobre tu consulta.';

      }

      this.mensajes.push({

        tipo:'bot',

        texto:respuesta

      });

      this.guardarDatos();

      this.cargando = false;

    },800);

  }

  limpiarMemoria(){

    localStorage.removeItem(
      'chat_historial'
    );

    localStorage.removeItem(
      'memoria_alumno'
    );

    this.memoriaAlumno = {

      nombre:'',
      carrera:'',
      creditos:0

    };

    this.mensajes = [

      {
        tipo:'bot',
        texto:'Memoria eliminada correctamente.'
      }

    ];

  }

}