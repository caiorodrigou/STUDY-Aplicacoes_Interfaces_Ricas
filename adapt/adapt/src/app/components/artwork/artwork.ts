import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox'; 
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';  
import { InputIconModule } from 'primeng/inputicon';   

export type TipoArt = 'Digital' | 'Moderna' | 'Classica' | 'Abstrata' | 'Escultura' | 'Fotografia';

export interface Artwork {
    id: number;
    img: URL;
    descricao: string;
    tipoArt: TipoArt;
    privado: boolean;
}

@Component({
  selector: 'app-artwork-table',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonModule, CardModule, TableModule, 
    TagModule, InputTextModule, SelectModule, CheckboxModule, DialogModule,
    IconFieldModule, InputIconModule
  ],
  templateUrl: './artwork.html'
})

export class ArtworkComponent implements OnInit {
  artworks: Artwork[] = [];
  clonedArtworks: { [s: number]: Artwork } = {};

  exibirDialog: boolean = false;
  novaArtDescricao: string = '';
  novaArtTipo: TipoArt = 'Digital';
  novaArtPrivado: boolean = false;
  novaArtImgUrl: string = ''; 

  opcoesTipoArt: { label: string, value: TipoArt }[] = [
    { label: 'Digital', value: 'Digital' },
    { label: 'Moderna', value: 'Moderna' },
    { label: 'Clássica', value: 'Classica' },
    { label: 'Abstrata', value: 'Abstrata' },
    { label: 'Escultura', value: 'Escultura' },
    { label: 'Fotografia', value: 'Fotografia' }
  ];

  ngOnInit() {
    this.artworks = [
      { id: 1, descricao: 'Noite Estrelada Reaginada', tipoArt: 'Digital', img: new URL('https://placehold.co/60x60'), privado: false },
      { id: 2, descricao: 'O Pensador Minimalista', tipoArt: 'Escultura', img: new URL('https://placehold.co/60x60'), privado: true }
    ];
  }

  abrirDialog() {
    this.novaArtDescricao = '';
    this.novaArtTipo = 'Digital';
    this.novaArtPrivado = false;
    this.novaArtImgUrl = '';
    this.exibirDialog = true;
  }

  salvarNovaArt() {
    const novoId = this.artworks.length > 0 ? Math.max(...this.artworks.map(a => a.id)) + 1 : 1;
    const urlFinal = this.novaArtImgUrl.trim() ? this.novaArtImgUrl : 'https://placehold.co/60x60';

    const arteParaAdicionar: Artwork = {
      id: novoId,
      descricao: this.novaArtDescricao,
      tipoArt: this.novaArtTipo,
      privado: this.novaArtPrivado,
      img: new URL(urlFinal) 
    };

    this.artworks = [...this.artworks, arteParaAdicionar];
    this.exibirDialog = false;
  }

  onRowEditInit(art: Artwork) { this.clonedArtworks[art.id] = { ...art }; }
  onRowEditSave(art: Artwork) { if (art.descricao.trim().length > 0) { delete this.clonedArtworks[art.id]; } }
  onRowEditCancel(art: Artwork, index: number) { this.artworks[index] = this.clonedArtworks[art.id]; delete this.clonedArtworks[art.id]; }
  excluir(id: number) { this.artworks = this.artworks.filter(a => a.id !== id); }

  getSeverity(tipo: TipoArt) {
    switch (tipo) {
      case 'Digital': return 'success';
      case 'Moderna': return 'info';
      case 'Classica': return 'secondary';
      case 'Abstrata': return 'warn';
      case 'Fotografia': return 'contrast';
      case 'Escultura': return 'danger';
      default: return 'info';
    }
  }
}