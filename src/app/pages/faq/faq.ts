import { Component } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-faq',

  standalone: true,

  imports: [
    MatExpansionModule
  ],

  templateUrl: './faq.html',

  styleUrl: './faq.css'
})

export class Faq {

}