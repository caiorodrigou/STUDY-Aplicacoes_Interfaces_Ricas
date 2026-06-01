import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Iartwork } from '../../model/artwork';

@Component({
  selector: 'artwork-listar',
  standalone: true,
  host: { class: 'block h-full' },
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    TagModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './artwork-listar.html',
  styleUrl: './artwork-listar.css',
  encapsulation: ViewEncapsulation.None,
})
export class ArtworkListar {
  artworks = input.required<Iartwork[]>();

  detalhar = output<Iartwork>();
  alterar = output<Iartwork>();
  excluir = output<number>();
}
