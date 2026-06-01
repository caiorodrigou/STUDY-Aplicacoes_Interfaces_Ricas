import { Component, output, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Iartwork, TipoArt } from '../../model/artwork';

@Component({
  selector: 'artwork-incluir',
  standalone: true,
  host: { class: 'block h-full' },
  imports: [
    FormsModule,
    FormField,
    ButtonModule,
    InputTextModule,
    SelectModule,
    CheckboxModule,
  ],
  templateUrl: './artwork-incluir.html',
  styleUrl: './artwork-incluir.css',
  encapsulation: ViewEncapsulation.None,
})
export class ArtworkIncluir {
  arteCriada = output<Omit<Iartwork, 'id'>>();

  submetido = signal(false);

  opcoesTipoArt: { label: string; value: TipoArt }[] = [
    { label: 'Digital', value: 'Digital' },
    { label: 'Moderna', value: 'Moderna' },
    { label: 'Clássica', value: 'Classica' },
    { label: 'Abstrata', value: 'Abstrata' },
    { label: 'Escultura', value: 'Escultura' },
    { label: 'Fotografia', value: 'Fotografia' },
  ];

  artModel = signal<Omit<Iartwork, 'id'>>({
    img: '',
    descricao: '',
    tipoArt: 'Digital',
    privado: false,
  });

  artForm = form(this.artModel, (schemaPath) => {
    required(schemaPath.img, { message: 'A URL da imagem é obrigatória.' });
    required(schemaPath.descricao, { message: 'A descrição da arte é obrigatória.' });
    required(schemaPath.tipoArt, { message: 'Selecione o tipo de arte.' });
  });

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.artForm().invalid()) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    this.arteCriada.emit({
      descricao: this.artForm.descricao().value(),
      img: this.artForm.img().value(),
      tipoArt: this.artForm.tipoArt().value(),
      privado: this.artForm.privado().value(),
    });

    this.submetido.set(true);
    this.artModel.set({
      img: '',
      descricao: '',
      tipoArt: 'Digital',
      privado: false,
    });
  }

  limparSubmetido(): void {
    this.submetido.set(false);
  }

  get tipoArt(): TipoArt {
    return this.artModel().tipoArt;
  }

  set tipoArt(value: TipoArt) {
    this.artModel.update((m) => ({ ...m, tipoArt: value }));
  }

  get privado(): boolean {
    return this.artModel().privado;
  }

  set privado(value: boolean) {
    this.artModel.update((m) => ({ ...m, privado: value }));
  }
}
