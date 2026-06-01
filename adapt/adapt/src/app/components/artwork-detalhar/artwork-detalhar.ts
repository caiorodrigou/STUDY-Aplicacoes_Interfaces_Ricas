import { Component, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { Iartwork } from '../../model/artwork';

@Component({
  selector: 'artwork-detalhar',
  standalone: true,
  imports: [CommonModule, TagModule],
  templateUrl: './artwork-detalhar.html',
  styleUrl: './artwork-detalhar.css',
  encapsulation: ViewEncapsulation.None,
})
export class ArtworkDetalhar {
  obra = input.required<Iartwork>();
}
