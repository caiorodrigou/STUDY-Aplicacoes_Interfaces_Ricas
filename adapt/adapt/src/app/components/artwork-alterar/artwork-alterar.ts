import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Iartwork, TipoArt } from '../../model/artwork';
import { ArtworkService } from '../../services/artwork.service';
import { ActivatedRoute, Router } from '@angular/router'; // Importações das rotas adicionadas

@Component({
  selector: 'artwork-alterar',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, SelectModule, CheckboxModule],
  templateUrl: './artwork-alterar.html',
  styleUrl: './artwork-alterar.css',
  encapsulation: ViewEncapsulation.None,
})
export class ArtworkAlterar implements OnInit {
  
  obra = signal<Iartwork>({} as Iartwork);

  constructor(
    private artworkService: ArtworkService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = Number(params.get('id'));

    this.artworkService.getArtworkById(id).subscribe({
      next: (obraParaEditar) => {
     
        this.obra.set({ ...obraParaEditar });
        
        this.descricao = obraParaEditar.descricao;
        this.img = obraParaEditar.img;
        this.tipoArt = obraParaEditar.tipoArt;
        this.privado = obraParaEditar.privado;
      },
      error: (err) => {
        console.error('Erro ao buscar obra no backend:', err);
        alert('Obra para edição não encontrada no servidor!');
        this.onCancelar();
      }
    });
  });
}

  get descricao(): string { return this.obra().descricao; }
  set descricao(value: string) { this.obra.update((o) => ({ ...o, descricao: value })); }

  get img(): string { return this.obra().img; }
  set img(value: string) { this.obra.update((o) => ({ ...o, img: value })); }

  get tipoArt(): TipoArt { return this.obra().tipoArt; }
  set tipoArt(value: TipoArt) { this.obra.update((o) => ({ ...o, tipoArt: value })); }

  get privado(): boolean { return this.obra().privado; }
  set privado(value: boolean) { this.obra.update((o) => ({ ...o, privado: value })); }

  onSalvar(): void {
    if (!this.obra().descricao || !this.obra().descricao.trim() || !this.obra().img || !this.obra().img.trim()) {
      alert('Descrição e URL da imagem são obrigatórias.');
      return;
    }

    this.artworkService.updateArtwork(this.obra().id, this.obra()).subscribe({
      next: () => {
        console.log('Obra alterada com sucesso no SQLite!');
        this.router.navigate(['/listagem']);
      },
      error: (err) => {
        console.error('Erro ao atualizar no servidor Django:', err);
        alert('Erro ao atualizar a obra no banco de dados. Verifique a URL da imagem!');
      }
    });
  }

  onCancelar(): void {
   
    this.router.navigate(['/listagem']);
  }
}