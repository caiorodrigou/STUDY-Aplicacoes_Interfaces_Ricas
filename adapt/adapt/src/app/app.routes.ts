import { Routes } from '@angular/router';
import { ArtworkListar } from './components/artwork-listar/artwork-listar';
import { ArtworkIncluir } from './components/artwork-incluir/artwork-incluir';
import { ArtworkDetalhar } from './components/artwork-detalhar/artwork-detalhar';
import { ArtworkAlterar } from './components/artwork-alterar/artwork-alterar';

export const routes: Routes = [
  { path: 'listagem', component: ArtworkListar },
  { path: 'inclusao', component: ArtworkIncluir },
  { path: 'detalhe/:id', component: ArtworkDetalhar },
  { path: 'atualizacao/:id', component: ArtworkAlterar },
  { path: '', redirectTo: '/listagem', pathMatch: 'full' },
  { path: '**', redirectTo: '/listagem' }
];