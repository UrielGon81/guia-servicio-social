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
  estudiantesActuales?: number;
  convenios?: number;
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

  // Base de datos de espacios disponibles - ACTUALIZADOS CON DATOS REALES DE UAEMEX
  espacios: { [key: string]: Espacio } = {
    
    // FACULTADES PRINCIPALES
    antropologia: {
      id: 'antropologia',
      nombre: 'Facultad de Antropología',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Oportunidades de servicio social en investigación antropológica, proyectos de vinculación comunitaria y documentación cultural.',
      ubicacion: 'Campus Principal',
      responsable: 'M.A. y E.C. Ricardo Alfredo Romero Aguirre',
      contacto: 'raromeroa@uaemex.mx | 722 669 7909',
      actividades: 'Investigación, documentación, trabajo comunitario, etnografía'
    },
    arquitectura: {
      id: 'arquitectura',
      nombre: 'Facultad de Arquitectura y Diseño',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Proyectos de diseño arquitectónico, restauración, urbanismo y proyectos de responsabilidad social.',
      ubicacion: 'Campus Principal - EXT. 3200',
      responsable: 'Víctor Hugo Orozco González',
      contacto: 'vhorozcog@uaemex.mx | 729 150 0258',
      actividades: 'Diseño, restauración, proyectos comunitarios, planeación urbana'
    },
    artes: {
      id: 'artes',
      nombre: 'Facultad de Artes',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Participación en eventos artísticos, promoción cultural, exhibiciones y proyectos creativos.',
      ubicacion: 'Campus Principal - EXT. 3380',
      responsable: 'Silvia Rosales Navarrete',
      contacto: 'srosalesn@uaemex.mx | 722 404 2409',
      actividades: 'Arte, cultura, exhibiciones, eventos artísticos, promoción cultural'
    },
    ciencias: {
      id: 'ciencias',
      nombre: 'Facultad de Ciencias',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Investigación científica, trabajo en laboratorios, proyectos de divulgación científica.',
      ubicacion: 'Campus Principal - EXT. 6010',
      responsable: 'Dr. Alejandro Fuentes Montes de Oca',
      contacto: 'afuentesm@uaemex.mx | 7221590075',
      actividades: 'Investigación, laboratorios, divulgación científica, experimentación'
    },
    ciencias_agricolas: {
      id: 'ciencias_agricolas',
      nombre: 'Facultad de Ciencias Agrícolas',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Proyectos agrícolas sustentables, extensión rural, investigación agronómica.',
      ubicacion: 'Campus Zaragoza - EXT. 60300',
      responsable: 'Gabriela Salomón Hernández',
      contacto: 'gsalomonh@uaemex.mx | 55 1800 8185',
      actividades: 'Agricultura sustentable, extensión rural, investigación, capacitación campesina'
    },
    ciencias_conducta: {
      id: 'ciencias_conducta',
      nombre: 'Facultad de Ciencias de la Conducta',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Intervención psicológica, orientación educativa, investigación en psicología aplicada.',
      ubicacion: 'Campus Principal - EXT. 3820',
      responsable: 'Dra. Diana Renedo González',
      contacto: 'drenedog@uaemex.mx | 722 233 9722',
      actividades: 'Orientación psicológica, investigación, intervención educativa, capacitación'
    },
    ciencias_politicas: {
      id: 'ciencias_politicas',
      nombre: 'Facultad de Ciencias Políticas y Sociales',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Análisis político, investigación social, vinculación comunitaria y gestión pública.',
      ubicacion: 'Campus Principal - EXT. 3220',
      responsable: 'Ana Esperanza García García',
      contacto: 'agarciaga@uaemex.mx | 722 362 5840',
      actividades: 'Análisis político, investigación social, gestión pública, vinculación comunitaria',
      estudiantesActuales: 15,
      convenios: 8
    },
    contaduria: {
      id: 'contaduria',
      nombre: 'Facultad de Contaduría y Administración',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Asesoría contable y administrativa, consultoría empresarial, asuntos fiscales.',
      ubicacion: 'Campus Principal - EXT. 3240',
      responsable: 'Adelaida Romero Reyes',
      contacto: 'aromeror005@uaemex.mx | 722 121 0409',
      actividades: 'Contabilidad, administración, consultoría, auditoría, asesoría fiscal'
    },
    derecho: {
      id: 'derecho',
      nombre: 'Facultad de Derecho',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Asesoría jurídica, litigio, defensoría de derechos humanos, acceso a justicia.',
      ubicacion: 'Campus Principal - EXT. 3260',
      responsable: 'Verónica Morales Flores',
      contacto: 'vmoralesf@uaemex.mx | 722 115 9849',
      actividades: 'Asesoría legal, litigio, derechos humanos, justicia alternativa, acceso a justicia'
    },
    economia: {
      id: 'economia',
      nombre: 'Facultad de Economía',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Análisis económico, estudios de mercado, consultoría económica y desarrollo regional.',
      ubicacion: 'Campus Principal - EXT. 3280',
      responsable: 'Arturo Alcántara González',
      contacto: 'aalcantarag@uaemex.mx | 729 126 6517',
      actividades: 'Análisis económico, estudios de mercado, consultoría, desarrollo regional'
    },
    enfermeria: {
      id: 'enfermeria',
      nombre: 'Facultad de Enfermería y Obstetricia',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Servicios de enfermería, atención comunitaria, promoción de salud, cuidado materno-infantil.',
      ubicacion: 'Campus Principal - EXT. 8001',
      responsable: 'Erika Rosales Cortines',
      contacto: 'erosalesc@uaemex.mx | 729 712 4264',
      actividades: 'Enfermería, atención comunitaria, promoción de salud, cuidado materno-infantil',
      estudiantesActuales: 106,
      convenios: 1
    },
    geografia: {
      id: 'geografia',
      nombre: 'Facultad de Geografía',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Investigación geográfica, cartografía, estudios ambientales y ordenamiento territorial.',
      ubicacion: 'Campus Principal - EXT. 3300',
      responsable: 'Agustin Olmos Cruz',
      contacto: 'aolmosc@uaemex.mx | 729 185 8098',
      actividades: 'Geografía, cartografía, estudios ambientales, ordenamiento territorial, SIG',
      estudiantesActuales: 51,
      convenios: 10
    },
    humanidades: {
      id: 'humanidades',
      nombre: 'Facultad de Humanidades',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Literatura, lingüística, historia, filosofía y estudios culturales.',
      ubicacion: 'Campus Principal - EXT. 3320',
      responsable: 'Gabriela González Miranda',
      contacto: 'ggonzalezm@uaemex.mx | 722 576 4319',
      actividades: 'Literatura, historia, lingüística, estudios culturales, investigación humanística',
      estudiantesActuales: 5,
      convenios: 0
    },
    ingenieria: {
      id: 'ingenieria',
      nombre: 'Facultad de Ingeniería',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Proyectos de ingeniería, innovación tecnológica, investigación y desarrollo.',
      ubicacion: 'Campus Principal - EXT. 3340',
      responsable: 'Beatriz Edith Gutiérrez Baltazar',
      contacto: 'begutierrezb@uaemex.mx | 722 157 7773',
      actividades: 'Ingeniería, innovación tecnológica, investigación, desarrollo de proyectos',
      estudiantesActuales: 232,
      convenios: 2
    },
    lenguas: {
      id: 'lenguas',
      nombre: 'Facultad de Lenguas',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Enseñanza de idiomas, traducción, interpretación y lingüística aplicada.',
      ubicacion: 'Campus Principal - EXT. 5120',
      responsable: 'Alma Delia Ramírez Silveira',
      contacto: 'adramirezs@uaemex.mx | 722 131 0882',
      actividades: 'Idiomas, traducción, interpretación, lingüística, enseñanza de lenguas'
    },
    medicina: {
      id: 'medicina',
      nombre: 'Facultad de Medicina',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Servicio médico comunitario, investigación clínica, asistencia sanitaria.',
      ubicacion: 'Campus Principal - EXT. 5000',
      responsable: 'Bethsabe Hernández Cruz',
      contacto: 'bhernandezc@uaemex.mx | 722 145 3392',
      actividades: 'Medicina, investigación clínica, atención comunitaria, promoción de salud'
    },
    veterinaria: {
      id: 'veterinaria',
      nombre: 'Facultad de Medicina Veterinaria y Zootecnia',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Medicina veterinaria, investigación zootécnica, sanidad animal y bienestar animal.',
      ubicacion: 'Campus Zaragoza - EXT. 6020',
      responsable: 'María Lourdes García Bello',
      contacto: 'mlgarciab@uaemex.mx | 722 600 9947',
      actividades: 'Medicina veterinaria, zootecnia, sanidad animal, bienestar animal, investigación'
    },
    odontologia: {
      id: 'odontologia',
      nombre: 'Facultad de Odontología',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Servicios dentales, prevención bucal, educación sanitaria y investigación odontológica.',
      ubicacion: 'Campus Principal - EXT. 5060',
      responsable: 'Lucía Mónica Álvarez Sánchez',
      contacto: 'lmalvarezs@uaemex.mx | 722 204 0624',
      actividades: 'Odontología, prevención bucal, educación sanitaria, investigación dental',
      estudiantesActuales: 106,
      convenios: 1
    },
    planeacion: {
      id: 'planeacion',
      nombre: 'Facultad de Planeación Urbana y Regional',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Planeación urbana, desarrollo regional, sustentabilidad y ordenamiento territorial.',
      ubicacion: 'Campus Principal - EXT. 50800',
      responsable: 'Irma Corral Reyes',
      contacto: 'icorralr@uaemex.mx | 722 826 3314',
      actividades: 'Planeación urbana, desarrollo regional, sustentabilidad, ordenamiento territorial'
    },
    quimica: {
      id: 'quimica',
      nombre: 'Facultad de Química',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Investigación química, análisis químico, industria química y tecnología ambiental.',
      ubicacion: 'Campus Zaragoza - EXT. 5020',
      responsable: 'Tamara Guevara Mote',
      contacto: 'tguevaram@uaemex.mx | 722 512 2639',
      actividades: 'Química, investigación, análisis químico, tecnología ambiental, industria'
    },
    turismo: {
      id: 'turismo',
      nombre: 'Facultad de Turismo y Gastronomía',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Gestión turística, gastronomía, hotelería y promoción de destinos turísticos.',
      ubicacion: 'Campus Principal - EXT. 3360',
      responsable: 'Yadira Edith de la Garza Sánchez',
      contacto: 'yedelagarzas@uaemex.mx | 722 532 3844',
      actividades: 'Turismo, gastronomía, hotelería, promoción de destinos, gestión turística'
    },
    artes_escenicas: {
      id: 'artes_escenicas',
      nombre: 'Escuela de Artes Escénicas',
      categoria: 'Facultad',
      disponibilidad: 'disponible',
      descripcion: 'Teatro, danza, música y artes performativas con proyección comunitaria.',
      ubicacion: 'Campus Principal - EXT. 3822',
      responsable: 'Berenice Velázquez García',
      contacto: 'bvelazquezg@uaemex.mx | 722 121 7359',
      actividades: 'Artes escénicas, teatro, danza, música, proyectos performativos comunitarios'
    },

    // CENTROS UNIVERSITARIOS
    cu_tenancingo: {
      id: 'cu_tenancingo',
      nombre: 'Centro Universitario UAEM Tenancingo',
      categoria: 'Centro Universitario',
      disponibilidad: 'disponible',
      descripcion: 'Oportunidades de servicio en educación, administración y proyectos comunitarios del sur del estado.',
      ubicacion: 'Tenancingo, Edo. de México - EXT. 7100',
      responsable: 'Anabel Orihuela Pavón',
      contacto: 'aorihuelapa@uaemex.mx | 722 520 1992',
      actividades: 'Educación, administración, proyectos comunitarios, extensión universitaria',
      estudiantesActuales: 80,
      convenios: 23
    },
    cu_amecameca: {
      id: 'cu_amecameca',
      nombre: 'Centro Universitario UAEM Amecameca',
      categoria: 'Centro Universitario',
      disponibilidad: 'disponible',
      descripcion: 'Servicio social en la región de Amecameca con enfoque en sostenibilidad.',
      ubicacion: 'Amecameca - EXT. 7000',
      responsable: 'María del Pilar Silva Rivera',
      contacto: 'mdsilvar@uaemex.mx | 55 2081 2561',
      actividades: 'Educación, sostenibilidad, desarrollo comunitario, investigación regional'
    },
    cu_atlacomulco: {
      id: 'cu_atlacomulco',
      nombre: 'Centro Universitario UAEM Atlacomulco',
      categoria: 'Centro Universitario',
      disponibilidad: 'disponible',
      descripcion: 'Oportunidades de servicio social en la región norte del estado.',
      ubicacion: 'Atlacomulco - EXT. 7010',
      responsable: 'Eduardo Cid González',
      contacto: 'ecidg@uaemex.mx | 712 229 9147',
      actividades: 'Educación, administración, investigación, servicios comunitarios'
    },
    cu_ecatepec: {
      id: 'cu_ecatepec',
      nombre: 'Centro Universitario UAEM Ecatepec',
      categoria: 'Centro Universitario',
      disponibilidad: 'disponible',
      descripcion: 'Servicio social en la zona metropolitana de Ecatepec.',
      ubicacion: 'Ecatepec - EXT. 7020',
      responsable: 'Mayra Riveros Domínguez',
      contacto: 'mriverosd@uaemex.mx | 55 4814 6690',
      actividades: 'Educación, servicios comunitarios, investigación aplicada'
    },
    cu_valle_chalco: {
      id: 'cu_valle_chalco',
      nombre: 'Centro Universitario UAEM Valle de Chalco',
      categoria: 'Centro Universitario',
      disponibilidad: 'disponible',
      descripcion: 'Oportunidades de servicio social en la región de Valle de Chalco.',
      ubicacion: 'Valle de Chalco - EXT. 7080',
      responsable: 'Jorge Mecalco Reyes',
      contacto: 'jmecalcor@uaemex.mx | 55 4377 5716',
      actividades: 'Educación, salud comunitaria, desarrollo social'
    },
    cu_texcoco: {
      id: 'cu_texcoco',
      nombre: 'Centro Universitario UAEM Texcoco',
      categoria: 'Centro Universitario',
      disponibilidad: 'disponible',
      descripcion: 'Servicio social con enfoque agrario en Texcoco.',
      ubicacion: 'Texcoco - EXT. 7070',
      responsable: 'Juan Manuel de la Luz Brindis Guzmán',
      contacto: 'jmbrindisg@uaemex.mx | 595 951 7130',
      actividades: 'Agricultura, educación, investigación agraria, sustentabilidad'
    },

    // UNIDADES ACADEMICAS PROFESIONALES
    uap_cuautitlan: {
      id: 'uap_cuautitlan',
      nombre: 'Unidad Académica Profesional Cuautitlán Izcalli',
      categoria: 'Unidad Académica',
      disponibilidad: 'disponible',
      descripcion: 'Oportunidades de servicio en la Unidad Académica Profesional de Cuautitlán.',
      ubicacion: 'Cuautitlán Izcalli - EXT. 7210',
      responsable: 'Leticia Angélica Maya Álvarez',
      contacto: 'lamayaa@uaemex.mx | 55 3925 2731',
      actividades: 'Educación profesional, investigación, servicios académicos'
    },
    uap_chimalhuacan: {
      id: 'uap_chimalhuacan',
      nombre: 'Unidad Académica Profesional Chimalhuacán',
      categoria: 'Unidad Académica',
      disponibilidad: 'disponible',
      descripcion: 'Servicio social en la Unidad Académica Profesional de Chimalhuacán.',
      ubicacion: 'Chimalhuacán - EXT. 7242',
      responsable: 'Yolanda Hernández Moreno',
      contacto: 'yhernandezm@uaemex.mx | 55 8669 0863',
      actividades: 'Educación, investigación, vinculación comunitaria'
    }
  };

  constructor() {}

  ngOnInit(): void {
    this.espacioSeleccionado = null;
  }

  /**
   * Seleccionar un espacio del mapa
   */
  seleccionarEspacio(espacioId: string): void {
    this.espacioSeleccionado = this.espacios[espacioId] || null;
    this.actualizarVisualizacionMapa(espacioId);
  }

  /**
   * Actualizar la visualización del punto seleccionado en el mapa SVG
   */
  actualizarVisualizacionMapa(espacioId: string): void {
    const puntos = document.querySelectorAll('.punto-interes');
    puntos.forEach(punto => punto.classList.remove('activo'));

    const puntoActivo = document.querySelector(`[data-espacio="${espacioId}"]`);
    if (puntoActivo) {
      puntoActivo.classList.add('activo');
    }
  }

  /**
   * Solicitar servicio social en el espacio seleccionado
   */
  solicitar(espacio: Espacio): void {
    const mensaje = `Solicitud iniciada para: ${espacio.nombre}\n\nResponsable: ${espacio.responsable}\nContacto: ${espacio.contacto}\n\nEste es un paso inicial. Te recomendamos contactar directamente al responsable de servicio social de la facultad o centro.`;
    alert(mensaje);
    
    // Alternativa para redirigir a formulario (cuando esté listo):
    // this.router.navigate(['/solicitud-servicio-social'], { queryParams: { espacio: espacio.id } });
  }

}