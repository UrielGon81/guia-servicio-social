import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Proceso } from './pages/proceso/proceso';
import { Requisitos } from './pages/requisitos/requisitos';
import { Faq } from './pages/faq/faq';
import { Checklist } from './pages/checklist/checklist';
import { Tutorial } from './pages/tutorial/tutorial';
import { Chatbot } from './pages/chatbot/chatbot';
export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'proceso',
    component: Proceso
  },

  {
    path: 'requisitos',
    component: Requisitos
  },

  {
    path: 'faq',
    component: Faq
  },

  {
    path: 'checklist',
    component: Checklist
  },

  {
    path: 'tutorial',
    component: Tutorial
  },
  {

  path: 'chatbot',
  loadComponent: () =>
    import('./pages/chatbot/chatbot').then(m => m.Chatbot)

  },
  {
    path: '**',
    redirectTo: ''
  }

];