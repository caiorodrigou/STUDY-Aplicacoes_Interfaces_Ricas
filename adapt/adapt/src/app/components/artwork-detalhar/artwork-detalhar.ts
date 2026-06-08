import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button'; // Adicionado para caso queira um botão de voltar
import { Iartwork } from '../../model/artwork';
import { ArtworkService } from '../../services/artwork.service';
import { ActivatedRoute, Router } from '@angular/router'; // Importações das rotas adicionadas

@Component({
  selector: 'artwork-detalhar',
  standalone: true,
  imports: [CommonModule, TagModule, ButtonModule],
  templateUrl: './artwork-detalhar.html',
  styleUrl: './artwork-detalhar.css',
  encapsulation: ViewEncapsulation.None,
})
export class ArtworkDetalhar implements OnInit {
  
  // Alterado de input para um Signal gravável local. 
  // Assim o seu HTML que já usa "obra().propriedade" continua funcionando perfeitamente!
  obra = signal<Iartwork | null>(null);

  // Injeção do ActivatedRoute e Router no construtor
  constructor(
    private artworkService: ArtworkService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
   
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id')); 
  
      const obraEncontrada = this.artworkService.getArtworkById(id);
      
      if (obraEncontrada) {
        this.obra.set(obraEncontrada);
      } else {
        alert('Obra não encontrada!');
        this.voltar();
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/listagem']); // Volta de forma programática para a listagem
  }
}