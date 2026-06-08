import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Importação crucial aqui!

@Component({
  selector: 'adicionar_art',
  standalone: true,
  imports: [RouterOutlet], // Deixe apenas o RouterOutlet
  templateUrl: './adicionar_art.html',
  styleUrl: './adicionar_art.css',
  encapsulation: ViewEncapsulation.None,
})
export class Adicionar_Art {}