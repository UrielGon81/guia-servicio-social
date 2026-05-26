import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

@Component({

  selector: 'app-navbar',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './navbar.html',

  styleUrl: './navbar.css'

})

export class Navbar implements OnInit {

  menuAbierto = false;

  darkMode = false;

  ngOnInit(){

    const tema =
      localStorage.getItem('darkMode');

    if(tema === 'true'){

      document.body.classList.add(
        'dark-mode'
      );

      this.darkMode = true;

    }

  }

  toggleDarkMode(){

    this.darkMode = !this.darkMode;

    document.body.classList.toggle(
      'dark-mode'
    );

    localStorage.setItem(
      'darkMode',
      this.darkMode.toString()
    );

  }

}