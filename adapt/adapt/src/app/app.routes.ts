import { Routes } from '@angular/router';
import { Adicionar_Art } from './pages/adicionar_art/adicionar_art';

export const routes: Routes = [
  // 1. Quando o usuário acessar a raiz (http://localhost:4200/), redireciona para a tela de adicionar arte
  { path: '', redirectTo: 'adicionar-art', pathMatch: 'full' },

  // 2. A rota real: Quando acessar 'adicionar-art', carrega o componente Adicionar_Art
  { path: 'adicionar-art', component: Adicionar_Art }
];