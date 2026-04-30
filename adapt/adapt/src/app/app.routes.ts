import { Routes } from '@angular/router';
import { ArtworkComponent } from './artwork/artwork';

export const routes: Routes = [
    {path: '', redirectTo: 'artwork', pathMatch: "full"}, 
    {path: 'artwork', component: ArtworkComponent}
];