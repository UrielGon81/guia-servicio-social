import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';

import { MatDialogModule } from '@angular/material/dialog';

import { MatDialog } from '@angular/material/dialog';

import { ModalAyuda } from '../../components/modal-ayuda/modal-ayuda';

@Component({
  selector: 'app-home',

  standalone: true,

  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],

  templateUrl: './home.html',

  styleUrl: './home.css'
})

export class Home {

  constructor(
    private dialog: MatDialog
  ) {}

  abrirModal(
    titulo: string,
    descripcion: string,
    imagen: string,
    lista: string[]
  ) {

    this.dialog.open(
      ModalAyuda,
      {

        width: '800px',

        data: {
          titulo,
          descripcion,
          imagen,
          lista
        }

      }
    );

  }

}