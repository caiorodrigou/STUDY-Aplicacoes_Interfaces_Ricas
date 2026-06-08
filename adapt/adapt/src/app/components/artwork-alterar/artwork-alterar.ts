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
  
  // Removido o model.required e criado um signal local inicializado vazio
  obra = signal<Iartwork>({} as Iartwork);

  // Injeção do ActivatedRoute e Router adicionados ao construtor
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
    // Resgata o ID enviado pela rota ativa
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      
      // Busca os dados da obra antiga para preencher o formulário
      const obraParaEditar = this.artworkService.getArtworkById(id);
      
      if (obraParaEditar) {
        this.obra.set({ ...obraParaEditar }); // Clona o objeto para o signal
      } else {
        alert('Obra para edição não encontrada!');
        this.onCancelar();
      }
    });
  }

  // Seus getters e setters continuam IGUAIS, pois o signal também aceita a função .update()
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

    const obraAtualizada = this.artworkService.updateArtwork(this.obra().id, this.obra());
    if (obraAtualizada) {
      // Modificado de .emit() para navegação programática de volta à tela de listagem
      this.router.navigate(['/listagem']);
    } else {
      alert('Erro ao atualizar a obra.');
    }
  }

  onCancelar(): void {
    // Modificado de .emit() para navegação programática de volta à tela de listagem
    this.router.navigate(['/listagem']);
  }
}