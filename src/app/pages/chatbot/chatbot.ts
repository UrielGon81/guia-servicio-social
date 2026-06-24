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
      tipo:'bot',
      texto:
      '👋 Hola, soy tu asistente virtual de Servicio Social. Estoy aquí para ayudarte con requisitos, SICDE, informes, horas, liberación y documentación. ¿Cuál es tu nombre?'
    }

  ];

  constructor(){

    const historial =
      sessionStorage.getItem(
        'chat_historial'
      );

    if(historial){

      this.mensajes =
        JSON.parse(historial);

    }

    const memoria =
      sessionStorage.getItem(
        'memoria_alumno'
      );

    if(memoria){

      this.memoriaAlumno =
        JSON.parse(memoria);

    }

  }

  guardarDatos(){

    if(this.mensajes.length > 50){

      this.mensajes =
        this.mensajes.slice(-50);

    }

    sessionStorage.setItem(
      'chat_historial',
      JSON.stringify(this.mensajes)
    );

    sessionStorage.setItem(
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

      if(

        textoLower.includes('me llamo') ||

        textoLower.includes('soy ')

      ){

        const nombre =
          texto.replace(
            /me llamo|soy/gi,
            ''
          ).trim();

        this.memoriaAlumno.nombre =
          nombre;

        respuesta =
          `😊 Mucho gusto ${nombre}. Recordaré tu nombre.`;

      }

      else if(

        textoLower.includes('que es el servicio social') ||

        textoLower.includes('servicio social')

      ){

        respuesta =
          '📚 El Servicio Social es una actividad obligatoria y temporal mediante la cual los estudiantes aplican sus conocimientos en beneficio de la sociedad y del Estado.';

      }

      else if(

        textoLower.includes('ingenieria') ||

        textoLower.includes('licenciatura')

      ){

        this.memoriaAlumno.carrera =
          texto;

        respuesta =
          '✅ He guardado tu carrera correctamente.';

      }

      else if(

        textoLower.includes('%') ||

        textoLower.includes('creditos')

      ){

        const numero =
          parseInt(texto);

        if(!isNaN(numero)){

          this.memoriaAlumno.creditos =
            numero;

          respuesta =
            numero >= 50
            ? `✅ Tienes ${numero}% de créditos. Puedes iniciar tu Servicio Social.`
            : `⚠️ Tienes ${numero}% de créditos. Necesitas al menos el 50%.`;

        }

      }
            else if(

        textoLower.includes('familiar') ||

        textoLower.includes('pariente') ||

        textoLower.includes('parentesco')

      ){

        respuesta =
          '❌ No puedes realizar tu Servicio Social cuando exista parentesco con la persona responsable de la unidad receptora.';

      }

      else if(

        textoLower.includes('registro') ||

        textoLower.includes('registrar') ||

        textoLower.includes('sicde')

      ){

        respuesta =
          '📋 Debes ingresar al sistema SICDE y completar correctamente tu información institucional.';

      }

      else if(

        textoLower.includes('requisito') ||

        textoLower.includes('documento') ||

        textoLower.includes('formato')

      ){

        respuesta =
          '📄 Necesitas formato de inscripción, carta de aceptación, CURP y seguro facultativo vigente.';

      }

      else if(

        textoLower.includes('carta de aceptacion')

      ){

        respuesta =
          '📄 La carta de aceptación es emitida por la unidad receptora donde realizarás tu Servicio Social.';

      }

      else if(

        textoLower.includes('carta de terminacion')

      ){

        respuesta =
          '📑 La carta de terminación acredita que concluiste satisfactoriamente tu Servicio Social.';

      }

      else if(

        textoLower.includes('informe') ||

        textoLower.includes('trimestral')

      ){

        respuesta =
          '📝 Los informes trimestrales deben entregarse en las fechas establecidas por la institución.';

      }

      else if(

        textoLower.includes('horas')

      ){

        respuesta =
          '⏰ El Servicio Social requiere cubrir al menos 480 horas.';

      }

      else if(

        textoLower.includes('duracion') ||

        textoLower.includes('cuanto dura')

      ){

        respuesta =
          '⏳ El Servicio Social debe realizarse en un periodo mínimo de 6 meses y máximo de 2 años.';

      }

      else if(

        textoLower.includes('liberacion') ||

        textoLower.includes('liberar')

      ){

        respuesta =
          '🎓 Para liberar tu Servicio Social debes completar las horas y entregar la documentación requerida.';

      }
            else if(

        textoLower.includes('quien soy') ||

        textoLower.includes('recuerdas mi nombre')

      ){

        respuesta =
          this.memoriaAlumno.nombre

          ? `😊 Claro. Tu nombre es ${this.memoriaAlumno.nombre}.`

          : '😅 Todavía no me has dicho tu nombre.';

      }

      else if(

        textoLower.includes('ayuda')

      ){

        respuesta =
          '🤖 Puedo ayudarte con SICDE, requisitos, horas, informes, liberación y documentación.';

      }

      else if(

        textoLower.includes('hola') ||

        textoLower.includes('buenas')

      ){

        respuesta =
          this.memoriaAlumno.nombre
          ? `👋 Hola ${this.memoriaAlumno.nombre}, ¿cómo puedo ayudarte?`
          : '👋 Hola, ¿cómo puedo ayudarte?';

      }

      else if(

        textoLower.includes('gracias')

      ){

        respuesta =
          '😊 Con gusto. Estoy para ayudarte.';

      }

      else{

        respuesta =
          '🤔 No encontré información específica sobre esa consulta. Intenta preguntar sobre SICDE, requisitos, informes, horas, liberación o documentación.';

      }

      this.mensajes.push({

        tipo:'bot',

        texto:respuesta

      });

      this.guardarDatos();

      this.cargando = false;

    },50);

  }

  limpiarMemoria(){

    sessionStorage.clear();

    this.memoriaAlumno = {

      nombre:'',
      carrera:'',
      creditos:0

    };

    this.mensajes = [

      {

        tipo:'bot',

        texto:
        '🗑️ Conversación reiniciada correctamente.'

      }

    ];

  }

} 