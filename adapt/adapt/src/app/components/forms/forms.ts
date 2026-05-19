import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Iartwork } from '../../model/artwork'; 

@Component({
  selector: 'Forms_art',
  standalone: true,
  imports: [FormField], 
  templateUrl: './forms.html',
  styleUrl: './forms.css',
})
export class Forms_Art {
  submetido = signal(false);

  artModel = signal<Omit<Iartwork, 'id'>>({
    img: '', 
    descricao: '',
    tipoArt: 'Digital', 
    privado: false
  });

  artForm = form(this.artModel, (schemaPath) => {
    required(schemaPath.img, { message: 'A URL da imagem é obrigatória.' });
    required(schemaPath.descricao, { message: 'A descrição da arte é obrigatória.' });
    required(schemaPath.tipoArt, { message: 'Selecione o tipo de arte.' });
  });

  onSubmit(event: Event) {
    event.preventDefault();

    const camposInvalidos = 
      this.artForm.img().invalid() || 
      this.artForm.descricao().invalid() || 
      this.artForm.tipoArt().invalid();

    if (camposInvalidos) {
      alert('Por favor, preencha todos os campos corretamente.');
      return; 
    }

    const novaArte = {
      descricao: this.artForm.descricao().value(),
      img: this.artForm.img().value(),
      tipoArt: this.artForm.tipoArt().value(),
      privado: this.artForm.privado().value()
    };

    console.log('Nova arte enviada com sucesso:', novaArte);
    
    // this.artService.adicionar(novaArte);
    
    this.submetido.set(true);

    this.artModel.set({
      img: '', 
      descricao: '',
      tipoArt: 'Digital',
      privado: false
    });
  }
}