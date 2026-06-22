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
  
  obra = signal<Iartwork | null>(null);

  constructor(
    private artworkService: ArtworkService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

  this.route.paramMap.subscribe(params => {
    const id = Number(params.get('id')); 

    this.artworkService.getArtworkById(id).subscribe({
      next: (obraEncontrada) => {
        this.obra.set(obraEncontrada);
      },
      error: (err) => {
        console.error('Erro ao detalhar obra:', err);
        alert('Não foi possível carregar os detalhes desta obra.');
      }
    });
  }); 
}

  voltar(): void {
    this.router.navigate(['/listagem']); 
  }
}