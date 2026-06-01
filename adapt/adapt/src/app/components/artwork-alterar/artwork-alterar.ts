import { Component, model, output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Iartwork, TipoArt } from '../../model/artwork';

@Component({
  selector: 'artwork-alterar',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, SelectModule, CheckboxModule],
  templateUrl: './artwork-alterar.html',
  styleUrl: './artwork-alterar.css',
  encapsulation: ViewEncapsulation.None,
})
export class ArtworkAlterar {
  obra = model.required<Iartwork>();

  salvar = output<Iartwork>();
  cancelar = output<void>();

  opcoesTipoArt: { label: string; value: TipoArt }[] = [
    { label: 'Digital', value: 'Digital' },
    { label: 'Moderna', value: 'Moderna' },
    { label: 'Clássica', value: 'Classica' },
    { label: 'Abstrata', value: 'Abstrata' },
    { label: 'Escultura', value: 'Escultura' },
    { label: 'Fotografia', value: 'Fotografia' },
  ];

  get descricao(): string {
    return this.obra().descricao;
  }

  set descricao(value: string) {
    this.obra.update((o) => ({ ...o, descricao: value }));
  }

  get img(): string {
    return this.obra().img;
  }

  set img(value: string) {
    this.obra.update((o) => ({ ...o, img: value }));
  }

  get tipoArt(): TipoArt {
    return this.obra().tipoArt;
  }

  set tipoArt(value: TipoArt) {
    this.obra.update((o) => ({ ...o, tipoArt: value }));
  }

  get privado(): boolean {
    return this.obra().privado;
  }

  set privado(value: boolean) {
    this.obra.update((o) => ({ ...o, privado: value }));
  }

  onSalvar(): void {
    if (!this.obra().descricao.trim() || !this.obra().img.trim()) {
      alert('Descrição e URL da imagem são obrigatórias.');
      return;
    }
    this.salvar.emit(this.obra());
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}
