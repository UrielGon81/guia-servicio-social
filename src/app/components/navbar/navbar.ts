import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',

  standalone: true,

  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],

  templateUrl: './navbar.html',

  styleUrl: './navbar.css'
})

export class Navbar {

  menuAbierto = false;

}