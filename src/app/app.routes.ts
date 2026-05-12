import { Routes } from '@angular/router';
import { Checklist } from './pages/checklist/checklist';
import { Home } from './pages/home/home';
import { Proceso } from './pages/proceso/proceso';
import { Requisitos } from './pages/requisitos/requisitos';
import { Faq } from './pages/faq/faq';
import { Chatbot } from './pages/chatbot/chatbot';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },
{
  path: 'checklist',
  component: Checklist
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
    path: 'chatbot',
    component: Chatbot
  }

];