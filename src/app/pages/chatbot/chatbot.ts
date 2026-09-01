import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Mensaje {
  tipo: 'usuario' | 'bot';
  texto: string;
  hora: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class ChatbotComponent implements OnInit {

  @ViewChild('chatBox') chatBox!: ElementRef<HTMLDivElement>;

  tooltipTexto: string = '';
  mostrarTooltip: boolean = false;
  mensajes: Mensaje[] = [];
  pregunta: string = '';
  cargando: boolean = false;

  respuestasBasicas: Record<string, string> = {
    'proceso': `El proceso de Servicio Social en UAEMéx incluye:

1. **Registro en SICDE** - Accede al sistema de control escolar
2. **Búsqueda de Espacio** - Explora las facultades y centros disponibles
3. **Entrega de Documentación** - Reúne tus documentos (CURP, historial académico, etc.)
4. **Aceptación** - Recibe confirmación de la unidad receptora
5. **Inicio de SS** - Comienza tus actividades (480 horas mínimo)
6. **Informes Trimestrales** - Presenta reportes cada 3 meses
7. **Liberación** - Conclusión y obtención del certificado

¿Necesitas ayuda con algún paso específico?`,

    'requisitos': `Los requisitos principales para Servicio Social son:

✅ Haber cursado al menos 50% de créditos de tu carrera
✅ CURP actualizada
✅ Historial académico
✅ Seguro facultativo vigente
✅ Formato de registro (disponible en tu facultad)
✅ Carta de aceptación de la institución receptora

⚠️ Cada facultad puede tener requisitos adicionales. Consulta con tu responsable de SS.`,

    'espacios': `Tenemos espacios disponibles en:

🏛️ **22 Facultades** principales
🏢 **6 Centros Universitarios** en el Estado de México
🎓 **6 Unidades Académicas Profesionales**

Puedes explorar todos los espacios en la sección "Espacios" del menú. Cada uno tiene:
- Responsable de Servicio Social
- Contacto directo
- Descripción de actividades
- Estadísticas de estudiantes

¿Quieres saber sobre una facultad específica?`,

    'duracion': `La duración del Servicio Social es:

⏱️ **Mínimo: 480 horas** (obligatorio)
📅 **Tiempo estimado: 3-4 meses** trabajando tiempo completo
📊 **Pueden ser parciales** si trabajas a tiempo parcial (6-8 meses)

Las horas se comprueban con:
- Reportes mensuales
- Firma del responsable
- Control de asistencia

¿Necesitas más información sobre la carga horaria?`,

    'documentos': `Documentos que necesitarás:

📄 **Para registrarse:**
- Formato de solicitud de SS
- CURP
- Historial académico
- Carta de aceptación

📋 **Durante el SS:**
- Reportes mensuales
- Firmas de asistencia
- Constancia de la institución receptora

🏆 **Al finalizar:**
- Informe final de actividades
- Solicitud de liberación
- Evaluación del supervisor

Descarga los formatos en tu facultad o pregunta por ellos al responsable de SS.`,

    'contacto': `Para contactar a tu responsable de Servicio Social:

1. Ve a la sección "Espacios" en el menú
2. Selecciona tu facultad o centro
3. Encontrarás:
   📞 Teléfono directo
   📧 Correo electrónico
   📍 Ubicación exacta
   👤 Nombre del responsable

También puedes ir directamente a tu facultad y preguntar por "Servicio Social".`
  };

  ngOnInit(): void {
    this.agregarMensajeBot('¡Hola! Soy tu Asistente Virtual de Servicio Social. ¿En qué puedo ayudarte hoy? 😊');
  }

  limpiarMemoria(): void {
    this.limpiarChat();
  }

  mostrarAyuda(): void {
    this.agregarMensajeBot('Puedo ayudarte con dudas sobre el proceso, requisitos, documentos, duración, espacios disponibles o datos de contacto. ¡Solo pregunta!');
  }

  enviarPreguntaPredefinida(pregunta: string): void {
    this.pregunta = pregunta;
    this.enviarPregunta();
  }

  enviarPregunta(): void {
    if (!this.pregunta.trim() || this.cargando) {
      return;
    }

    const preguntaLimpia = this.pregunta.trim();
    this.agregarMensajeUsuario(preguntaLimpia);
    this.pregunta = '';
    this.cargando = true;

    // Retardo breve no bloqueante (100ms)
    setTimeout(() => {
      this.obtenerRespuesta(preguntaLimpia);
      this.cargando = false;
    }, 100);
  }

  private obtenerRespuesta(pregunta: string): void {
    const preguntaLower = pregunta.toLowerCase();

    if (preguntaLower.includes('proceso')) {
      this.agregarMensajeBot(this.respuestasBasicas['proceso']);
      return;
    }
    if (preguntaLower.includes('requisito')) {
      this.agregarMensajeBot(this.respuestasBasicas['requisitos']);
      return;
    }
    if (preguntaLower.includes('espacio') || preguntaLower.includes('dónde') || preguntaLower.includes('donde')) {
      this.agregarMensajeBot(this.respuestasBasicas['espacios']);
      return;
    }
    if (preguntaLower.includes('duración') || preguntaLower.includes('duracion') || preguntaLower.includes('tiempo') || preguntaLower.includes('horas')) {
      this.agregarMensajeBot(this.respuestasBasicas['duracion']);
      return;
    }
    if (preguntaLower.includes('documento')) {
      this.agregarMensajeBot(this.respuestasBasicas['documentos']);
      return;
    }
    if (preguntaLower.includes('contacto') || preguntaLower.includes('teléfono') || preguntaLower.includes('telefono')) {
      this.agregarMensajeBot(this.respuestasBasicas['contacto']);
      return;
    }

    this.agregarMensajeBot('No tengo una respuesta exacta para eso, pero puedo ayudarte con: el proceso de Servicio Social, requisitos, documentos, duración, espacios disponibles o datos de contacto. ¿Sobre cuál te gustaría saber más?');
  }

  private agregarMensajeUsuario(texto: string): void {
    this.mensajes.push({
      tipo: 'usuario',
      texto: texto,
      hora: this.obtenerHora()
    });
    this.scrollAlFinal();
  }

  private agregarMensajeBot(texto: string): void {
    this.mensajes.push({
      tipo: 'bot',
      texto: texto,
      hora: this.obtenerHora()
    });
    this.scrollAlFinal();
  }

  limpiarChat(): void {
    this.mensajes = [];
    this.pregunta = '';
    this.cargando = false;
    this.agregarMensajeBot('¡Conversación limpiada! ¿Cómo puedo ayudarte? 😊');
  }

  private obtenerHora(): string {
    return new Date().toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  private scrollAlFinal(): void {
    setTimeout(() => {
      if (this.chatBox?.nativeElement) {
        this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
      }
    }, 0);
  }
}