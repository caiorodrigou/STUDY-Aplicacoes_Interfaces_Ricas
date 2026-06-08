import { Component, ViewEncapsulation, inject } from '@angular/core'; // Importado inject
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
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
  // Correção aqui: Injetando o service diretamente na propriedade para poder usar no toSignal
  private artworkService = inject(ArtworkService);
  private router = inject(Router);

  artworks = toSignal(this.artworkService.getArtworks(), { initialValue: [] });

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
    if (confirm('Deseja realmente excluir esta obra?')) {
      this.artworkService.deleteArtwork(id);
    }
  }
}