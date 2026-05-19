import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


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
import { Iartwork } from '../../model/artwork';
import { TipoArt } from '../../model/artwork';

@Component({
  selector: 'listar-arts',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonModule, CardModule, TableModule, 
    TagModule, InputTextModule, SelectModule, CheckboxModule, DialogModule,
    IconFieldModule, InputIconModule
  ],
  templateUrl: './artwork.html'
})
export class Listar_arts implements OnInit {
  artworks: Iartwork[] = [];
  clonedArtworks: { [s: number]: Iartwork } = {};

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
      { id: 1, descricao: 'Noite Estrelada Reaginada', tipoArt: 'Digital', img: ('https://placehold.co/60x60'), privado: false },
      { id: 2, descricao: 'O Pensador Minimalista', tipoArt: 'Escultura', img: ('https://placehold.co/60x60'), privado: true }
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

    const arteParaAdicionar: Iartwork = {
      id: novoId,
      descricao: this.novaArtDescricao,
      tipoArt: this.novaArtTipo,
      privado: this.novaArtPrivado,
      img: (urlFinal) 
    };

    this.artworks = [...this.artworks, arteParaAdicionar];
    this.exibirDialog = false;
  }

  onRowEditInit(art: Iartwork) { this.clonedArtworks[art.id] = { ...art }; }
  onRowEditSave(art: Iartwork) { if (art.descricao.trim().length > 0) { delete this.clonedArtworks[art.id]; } }
  onRowEditCancel(art: Iartwork, index: number) { this.artworks[index] = this.clonedArtworks[art.id]; delete this.clonedArtworks[art.id]; }
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