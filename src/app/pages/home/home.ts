import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {

  tarjetaActiva = '';

  abrirTarjeta(nombre: string): void {

    this.tarjetaActiva =
      this.tarjetaActiva === nombre
        ? ''
        : nombre;

  }

}