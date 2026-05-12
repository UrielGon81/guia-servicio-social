import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-ayuda',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './modal-ayuda.html',

  styleUrl: './modal-ayuda.css'
})

export class ModalAyuda {

  constructor(

    @Inject(MAT_DIALOG_DATA)

    public data: any

  ) {}

}