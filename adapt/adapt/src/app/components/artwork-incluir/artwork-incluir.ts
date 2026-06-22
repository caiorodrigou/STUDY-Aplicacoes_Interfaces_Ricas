import { Component, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Iartwork, TipoArt } from '../../model/artwork';
import { ArtworkService } from '../../services/artwork.service';
import { Router } from '@angular/router';

@Component({
  selector: 'artwork-incluir',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, SelectModule, CheckboxModule],
  templateUrl: './artwork-incluir.html',
  styleUrl: './artwork-incluir.css',
  encapsulation: ViewEncapsulation.None,
})
export class ArtworkIncluir {
  novaObra = signal<Omit<Iartwork, 'id'>>({
    img: '',
    descricao: '',
    tipoArt: 'Digital',
    privado: false
  });

  submetido = signal(false);

  constructor(
    private artworkService: ArtworkService,
    private router: Router
  ) {}

  opcoesTipoArt: { label: string; value: TipoArt }[] = [
    { label: 'Digital', value: 'Digital' },
    { label: 'Moderna', value: 'Moderna' },
    { label: 'Clássica', value: 'Classica' },
    { label: 'Abstrata', value: 'Abstrata' },
    { label: 'Escultura', value: 'Escultura' },
    { label: 'Fotografia', value: 'Fotografia' },
  ];

  get descricao(): string { return this.novaObra().descricao; }
  set descricao(value: string) { this.novaObra.update((o) => ({ ...o, descricao: value })); }

  get img(): string { return this.novaObra().img; }
  set img(value: string) { this.novaObra.update((o) => ({ ...o, img: value })); }

  get tipoArt(): TipoArt { return this.novaObra().tipoArt; }
  set tipoArt(value: TipoArt) { this.novaObra.update((o) => ({ ...o, tipoArt: value })); }

  get privado(): boolean { return this.novaObra().privado; }
  set privado(value: boolean) { this.novaObra.update((o) => ({ ...o, privado: value })); }

  onSubmit(event: Event): void {
    event.preventDefault();

    const dadosParaSalvar = {
      descricao: this.descricao.trim(),
      img: this.img.trim(),
      tipoArt: this.tipoArt,
      privado: this.privado
    };

    if (!dadosParaSalvar.descricao || !dadosParaSalvar.img) {
      this.submetido.set(true); // Se tiver um signal de validação
      return;
    }

    this.artworkService.createArtwork(dadosParaSalvar).subscribe({
      next: () => {
        this.router.navigate(['/listagem']); 
      },
      error: (err) => {
        console.error('Erro ao salvar no Django:', err);
        alert('Erro ao conectar com o servidor do Codespaces.');
      }
    });
  }

  limparSubmetido(): void {
    this.submetido.set(false);
  }

  onSalvar(): void {
    if (!this.novaObra().descricao.trim() || !this.novaObra().img.trim()) {
      alert('Descrição e URL da imagem são obrigatórias.');
      return;
    }
    this.artworkService.createArtwork(this.novaObra());
    this.router.navigate(['/listagem']);
  }

  onCancelar(): void {
    this.router.navigate(['/listagem']);
  }
}