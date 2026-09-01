import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Espacio {
  id: string;
  nombre: string;
  categoria: string;
  disponibilidad: 'disponible' | 'limitado';
  descripcion: string;
  ubicacion: string;
  responsable: string;
  contacto: string;
  actividades: string;
}

@Component({
  selector: 'app-mapa-espacios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa-espacios.html',
  styleUrls: ['./mapa-espacios.css']
})
export class MapaEspaciosComponent implements OnInit {

  espacioSeleccionado: Espacio | null = null;

  // Base de datos de espacios disponibles (ejemplo genérico UAEMéx)
  espacios: { [key: string]: Espacio } = {
    biblioteca: {
      id: 'biblioteca',
      nombre: 'Biblioteca Central',
      categoria: 'Área Académica',
      disponibilidad: 'disponible',
      descripcion: 'Apoyo en organización, catalogación y servicios al usuario. Oportunidad de desarrollar habilidades en gestión informática y atención al público.',
      ubicacion: 'Planta baja, Edificio Principal',
      responsable: 'Lic. María García López',
      contacto: 'ext. 2150 | biblioteca@uaemex.mx',
      actividades: 'Catalogación, digitalización, atención a usuarios, mantenimiento de acervos'
    },
    computo: {
      id: 'computo',
      nombre: 'Centro de Cómputo',
      categoria: 'Área Académica',
      disponibilidad: 'disponible',
      descripcion: 'Soporte técnico, mantenimiento de equipos y asistencia en laboratorios. Ideal para estudiantes de Ingeniería en Computación o afines.',
      ubicacion: 'Segundo piso, Edificio de Tecnología',
      responsable: 'Ing. Carlos Mendez Ruiz',
      contacto: 'ext. 2280 | ccomputo@uaemex.mx',
      actividades: 'Soporte técnico, mantenimiento preventivo, asistencia en prácticas, capacitación'
    },
    laboratorios: {
      id: 'laboratorios',
      nombre: 'Laboratorios Académicos',
      categoria: 'Área Especializada',
      disponibilidad: 'disponible',
      descripcion: 'Apoyo en prácticas de Química, Biología, Física e Ingenierías. Preparación de material y seguridad en laboratorios.',
      ubicacion: 'Tercer piso, Ala Oriente',
      responsable: 'Dra. Patricia Sánchez Méndez',
      contacto: 'ext. 2450 | laboratorios@uaemex.mx',
      actividades: 'Preparación de experimentos, seguridad, mantenimiento de equipos, apoyo a docentes'
    },
    rectoria: {
      id: 'rectoria',
      nombre: 'Oficina de Rectoría',
      categoria: 'Área Administrativa',
      disponibilidad: 'limitado',
      descripcion: 'Apoyo en procesos administrativos, gestión de documentos y atención a comunidad universitaria. Acceso a información institucional.',
      ubicacion: 'Primer piso, Edificio Administrativo',
      responsable: 'Mtro. Juan Carlos Hernández',
      contacto: 'ext. 2100 | rectoria@uaemex.mx',
      actividades: 'Gestión de trámites, archivo, recepción, apoyo a eventos institucionales'
    },
    idiomas: {
      id: 'idiomas',
      nombre: 'Centro de Idiomas',
      categoria: 'Área de Servicios',
      disponibilidad: 'disponible',
      descripcion: 'Apoyo en enseñanza de idiomas, preparación de material didáctico y tutoría. Perfecto para estudiantes de Idiomas o Educación.',
      ubicacion: 'Aula 301, Edificio de Humanidades',
      responsable: 'Mtra. Elizabeth Flores García',
      contacto: 'ext. 2600 | idiomas@uaemex.mx',
      actividades: 'Tutoría, preparación de material, asistencia docente, conversatorio'
    },
    admin: {
      id: 'admin',
      nombre: 'Oficinas Administrativas',
      categoria: 'Área Administrativa',
      disponibilidad: 'disponible',
      descripcion: 'Apoyo en procesos de gestión académica y administrativa. Datos, reportes y expedientes de estudiantes.',
      ubicacion: 'Planta baja, Oficinas Centrales',
      responsable: 'Lic. Roberto Flores Díaz',
      contacto: 'ext. 2200 | administracion@uaemex.mx',
      actividades: 'Captura de datos, generación de reportes, archivo, control escolar'
    },
    vinculacion: {
      id: 'vinculacion',
      nombre: 'Departamento de Vinculación Social',
      categoria: 'Área Especializada',
      disponibilidad: 'disponible',
      descripcion: 'Enlace con comunidad y organismos externos. Proyectos de extensión, investigación y responsabilidad social universitaria.',
      ubicacion: 'Cuarto piso, Edificio de Rectoría',
      responsable: 'Dra. Laura Martínez González',
      contacto: 'ext. 2350 | vinculacion@uaemex.mx',
      actividades: 'Gestión de proyectos comunitarios, vinculación empresarial, investigación aplicada'
    },
    cultural: {
      id: 'cultural',
      nombre: 'Centro Cultural',
      categoria: 'Área de Servicios',
      disponibilidad: 'disponible',
      descripcion: 'Organización de eventos, actividades artísticas y culturales. Difusión de la identidad universitaria.',
      ubicacion: 'Auditorio Principal',
      responsable: 'Arq. Fernando López Ramos',
      contacto: 'ext. 2700 | cultural@uaemex.mx',
      actividades: 'Organización de eventos, promoción artística, difusión cultural, coordinación'
    },
    servicios: {
      id: 'servicios',
      nombre: 'Servicios Estudiantiles',
      categoria: 'Área de Servicios',
      disponibilidad: 'disponible',
      descripcion: 'Apoyo en bienestar estudiantil, orientación académica, y servicios complementarios. Atención a la comunidad.',
      ubicacion: 'Segundo piso, Centro de Servicios',
      responsable: 'Lic. Sofía Rodríguez Pérez',
      contacto: 'ext. 2550 | servicios@uaemex.mx',
      actividades: 'Orientación académica, apoyo psicológico, becas, apoyo socioeconómico'
    },
    deportes: {
      id: 'deportes',
      nombre: 'Deportes y Recreación',
      categoria: 'Área Especializada',
      disponibilidad: 'disponible',
      descripcion: 'Apoyo en programas deportivos, recreación y promoción de salud. Organización de eventos y torneos.',
      ubicacion: 'Complejos deportivos, Campus Principal',
      responsable: 'Lic. Miguel Ángel Carrillo Gómez',
      contacto: 'ext. 2800 | deportes@uaemex.mx',
      actividades: 'Organización de eventos deportivos, entrenamiento, promoción de salud, recreación'
    }
  };

  constructor() {}

  ngOnInit(): void {
    // Inicializar con el primer espacio
    this.espacioSeleccionado = null;
  }

  /**
   * Seleccionar un espacio del mapa
   */
  seleccionarEspacio(espacioId: string): void {
    this.espacioSeleccionado = this.espacios[espacioId] || null;
    
    // Actualizar visual del punto en el mapa
    this.actualizarVisualizacionMapa(espacioId);
  }

  /**
   * Actualizar la visualización del punto seleccionado en el mapa SVG
   */
  actualizarVisualizacionMapa(espacioId: string): void {
    // Remover clase 'activo' de todos los puntos
    const puntos = document.querySelectorAll('.punto-interes');
    puntos.forEach(punto => punto.classList.remove('activo'));

    // Agregar clase 'activo' al punto seleccionado
    const puntoActivo = document.querySelector(`[data-espacio="${espacioId}"]`);
    if (puntoActivo) {
      puntoActivo.classList.add('activo');
    }
  }

  /**
   * Solicitar servicio social en el espacio seleccionado
   */
  solicitar(espacio: Espacio): void {
    // Aquí puedes redirigir a un formulario o abrir un modal
    alert(`Solicitud iniciada para: ${espacio.nombre}\n\nResponsable: ${espacio.responsable}\nContacto: ${espacio.contacto}`);
    
    // Alternativa: redirigir a formulario
    // this.router.navigate(['/solicitud-servicio-social'], { queryParams: { espacio: espacio.id } });
  }

}