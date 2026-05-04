import { Routes } from '@angular/router';
import { ArtworkComponent } from './components/artwork/artwork';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '', // Caminho vazio significa a raiz da URL (ex: localhost:4200/)
    component: Home
  },

  { path: 'artwork', component: ArtworkComponent }

];