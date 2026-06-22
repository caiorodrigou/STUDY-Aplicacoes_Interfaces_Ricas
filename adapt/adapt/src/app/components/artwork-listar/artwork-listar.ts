import { Component, ViewEncapsulation, inject } from '@angular/core'; // Importado inject
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ArtworkService } from '../../services/artwork.service';
import { Router } from '@angular/router';

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
  
  private artworkService = inject(ArtworkService);
  private router = inject(Router);

  artworks = this.artworkService.artworks; 

  irParaInclusao(): void {
    this.router.navigate(['/inclusao']);
  }

  irParaDetalhe(id: number): void {
    this.router.navigate(['/detalhe', id]);
  }

  irParaAtualizacao(id: number): void {
    this.router.navigate(['/atualizacao', id]);
  }

  onExcluir(id: number): void {
    if (confirm('Deseja realmente remover esta obra permanentemente do acervo?')) {
      
      this.artworkService.deleteArtwork(id).subscribe({
        next: () => {
          console.log('Ordem de exclusão processada pelo servidor!');
        },
        error: (err) => {
          console.error('Erro ao deletar no servidor:', err);
          alert('Não foi possível excluir a obra do banco de dados.');
        }
      });
    }
  }
}