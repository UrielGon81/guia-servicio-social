import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-proceso',

  standalone: true,

  imports: [
    RouterLink,
    MatButtonModule
  ],

  templateUrl: './proceso.html',

  styleUrl: './proceso.css'
})

export class Proceso {

}