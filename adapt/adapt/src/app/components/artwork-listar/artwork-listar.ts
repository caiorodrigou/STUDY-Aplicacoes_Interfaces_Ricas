import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Iartwork } from '../../model/artwork';

@Component({
  selector: 'artwork-listar',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    TableModule,
    TagModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './artwork-listar.html',
})
export class ArtworkListar {
  artworks = input.required<Iartwork[]>();

  detalhar = output<Iartwork>();
  alterar = output<Iartwork>();
  excluir = output<number>();
}
