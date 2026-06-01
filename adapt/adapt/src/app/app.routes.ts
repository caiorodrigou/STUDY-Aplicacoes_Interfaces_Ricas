import { Routes } from '@angular/router';
import { Adicionar_Art } from './pages/adicionar_art/adicionar_art';

export const routes: Routes = [
  { path: '', component: Adicionar_Art },
  { path: 'galeria', component: Adicionar_Art },
];