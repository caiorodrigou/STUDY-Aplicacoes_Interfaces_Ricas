import { Routes } from '@angular/router';
import { artwork } from './artwork/artwork';

export const routes: Routes = [
    {path: '', redirectTo: 'artwork', pathMatch: "full"}, 
    {path: 'artwork', component: artwork}
];