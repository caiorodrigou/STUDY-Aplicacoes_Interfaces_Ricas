import { Component, signal, ViewEncapsulation, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ArtworkIncluir } from '../../components/artwork-incluir/artwork-incluir';
import { ArtworkListar } from '../../components/artwork-listar/artwork-listar';
import { ArtworkDetalhar } from '../../components/artwork-detalhar/artwork-detalhar';
import { ArtworkAlterar } from '../../components/artwork-alterar/artwork-alterar';
import { Iartwork } from '../../model/artwork';
import { ArtworkService } from '../../services/artwork.service';

@Component({
  selector: 'adicionar_art',
  standalone: true,
  imports: [
    DialogModule,
    ArtworkIncluir,
    ArtworkListar,
    ArtworkDetalhar,
    ArtworkAlterar,
  ],
  templateUrl: './adicionar_art.html',
  styleUrl: './adicionar_art.css',
  encapsulation: ViewEncapsulation.None,
})
export class Adicionar_Art implements OnInit {
  artworks = signal<Iartwork[]>([]);

  obraSelecionada = signal<Iartwork | null>(null);
  exibirDetalhe = signal(false);

  exibirAlterar = signal(false);
  obraEdicao = signal<Iartwork>({
    id: 0,
    descricao: '',
    img: '',
    tipoArt: 'Digital',
    privado: false,
  });

  constructor(private artworkService: ArtworkService) {}

  ngOnInit(): void {
    this.carregarArtworks();
  }

  carregarArtworks(): void {
    this.artworks.set(this.artworkService.getAllArtworks());
  }

  adicionarArte(arte: Iartwork): void {
    this.carregarArtworks();
  }

  abrirDetalhe(obra: Iartwork): void {
    this.obraSelecionada.set(obra);
    this.exibirDetalhe.set(true);
  }

  abrirAlterar(obra: Iartwork): void {
    this.obraEdicao.set({ ...obra });
    this.exibirAlterar.set(true);
  }

  confirmarAlteracao(obraAtualizada: Iartwork): void {
    this.carregarArtworks();
    this.exibirAlterar.set(false);
  }

  cancelarAlteracao(): void {
    this.exibirAlterar.set(false);
  }

  excluirObra(id: number): void {
    this.carregarArtworks();
  }
}
