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
  '👋 Hola, soy tu asistente virtual de Servicio Social. Estoy aquí para ayudarte con requisitos, registro en SICDE, informes, horas y documentación. ¿Cuál es tu nombre?'
}


];

constructor(){

const historial =
  localStorage.getItem(
    'chat_historial'
  );

if(historial){

  this.mensajes =
    JSON.parse(historial);

}

const memoria =
  localStorage.getItem(
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
      `😊 Mucho gusto ${nombre}. Recordaré tu nombre para futuras consultas.`;

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

    textoLower.includes('%')

  ){

    const numero =
      parseInt(texto);

    if(!isNaN(numero)){

      this.memoriaAlumno.creditos =
        numero;

      respuesta =
        numero >= 50
        ? `✅ Tienes ${numero}% de créditos. Puedes iniciar tu Servicio Social.`
        : `⚠️ Tienes ${numero}% de créditos. Necesitas alcanzar al menos el 50%.`;

    }

  }

  else if(

    textoLower.includes('registro') ||

    textoLower.includes('registrar') ||

    textoLower.includes('sicde')

  ){

    respuesta =
      '📋 Para registrarte debes ingresar al sistema SICDE y completar correctamente tu información institucional.';

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

    textoLower.includes('informe') ||

    textoLower.includes('trimestral')

  ){

    respuesta =
      '📝 Los informes trimestrales deben entregarse en los periodos establecidos por la institución.';

  }

  else if(

    textoLower.includes('horas')

  ){

    respuesta =
      '⏰ El Servicio Social requiere cubrir al menos 480 horas.';
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
      '🤖 Puedo ayudarte con requisitos, SICDE, horas, informes y documentación necesaria para Servicio Social.';

  }

  else if(

    textoLower.includes('como estas')

  ){

    respuesta =
      '😊 Estoy muy bien. Gracias por preguntar. ¿En qué puedo ayudarte?';

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
      '🤔 No encontré información específica sobre esa consulta. Intenta utilizar palabras como requisitos, SICDE, informes, documentos u horas.';

  }

  this.mensajes.push({

    tipo:'bot',

    texto:respuesta

  });

  this.guardarDatos();

  this.cargando = false;

},150);

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
    texto:
    '🗑️ Conversación reiniciada correctamente. ¿Cuál es tu nombre?'
  }

];


}

}

