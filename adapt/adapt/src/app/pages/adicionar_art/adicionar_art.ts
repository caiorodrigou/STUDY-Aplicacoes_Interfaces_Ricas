import { Component, model, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ArtworkIncluir } from '../../components/artwork-incluir/artwork-incluir';
import { ArtworkListar } from '../../components/artwork-listar/artwork-listar';
import { ArtworkDetalhar } from '../../components/artwork-detalhar/artwork-detalhar';
import { ArtworkAlterar } from '../../components/artwork-alterar/artwork-alterar';
import { Iartwork } from '../../model/artwork';

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
})
export class Adicionar_Art {
  artworks = signal<Iartwork[]>([
    {
      id: 1,
      descricao: 'Noite Estrelada Reaginada',
      tipoArt: 'Digital',
      img: 'https://placehold.co/60x60',
      privado: false,
    },
    {
      id: 2,
      descricao: 'O Pensador Minimalista',
      tipoArt: 'Escultura',
      img: 'https://placehold.co/60x60',
      privado: true,
    },
  ]);

  obraSelecionada = signal<Iartwork | null>(null);
  exibirDetalhe = signal(false);

  exibirAlterar = signal(false);
  obraEdicao = model<Iartwork>({
    id: 0,
    descricao: '',
    img: '',
    tipoArt: 'Digital',
    privado: false,
  });

  adicionarArte(arte: Omit<Iartwork, 'id'>): void {
    const lista = this.artworks();
    const novoId = lista.length > 0 ? Math.max(...lista.map((a) => a.id)) + 1 : 1;
    const urlFinal = arte.img.trim() ? arte.img.trim() : 'https://placehold.co/60x60';

    this.artworks.update((atual) => [
      ...atual,
      { ...arte, id: novoId, img: urlFinal },
    ]);
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
    this.artworks.update((lista) =>
      lista.map((a) => (a.id === obraAtualizada.id ? { ...obraAtualizada } : a)),
    );
    this.exibirAlterar.set(false);
  }

  cancelarAlteracao(): void {
    this.exibirAlterar.set(false);
  }

  excluirObra(id: number): void {
    this.artworks.update((lista) => lista.filter((a) => a.id !== id));
  }
}
