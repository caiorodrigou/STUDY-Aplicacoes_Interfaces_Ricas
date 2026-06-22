import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Iartwork } from '../model/artwork';

@Injectable({
  providedIn: 'root',
})
export class ArtworkService {
  private http = inject(HttpClient);

  private apiUrl = 'https://verbose-potato-q74jxvxwxw79c9vrg-8000.app.github.dev/api/artworks';

  private artworksSignal = signal<Iartwork[]>([]);
  public artworks = this.artworksSignal.asReadonly();

  constructor() {
    this.listarDoBackend().subscribe();
  }

  public listarDoBackend(): Observable<Iartwork[]> {
    return this.http.get<Iartwork[]>(`${this.apiUrl}/`).pipe(
      tap((dados) => this.artworksSignal.set(dados))
    );
  }

  getArtworks(): Observable<Iartwork[]> {
    return this.listarDoBackend();
  }

  getArtworkById(id: number): Observable<Iartwork> {
    return this.http.get<Iartwork>(`${this.apiUrl}/${id}/`);
  }


  createArtwork(artwork: Omit<Iartwork, 'id'>): Observable<Iartwork> {
    return this.http.post<Iartwork>(`${this.apiUrl}/`, artwork).pipe(
      tap(() => {
        // Força a atualização do Signal global do serviço
        this.getArtworks().subscribe();
      })
    );
  }

  updateArtwork(id: number, artwork: Partial<Iartwork>): Observable<Iartwork> {
    return this.http.put<Iartwork>(`${this.apiUrl}/${id}/`, artwork).pipe(
      tap((obraAtualizada) => {
        // Atualiza o Signal local substituindo a obra antiga pela nova modificada
        const listaModificada = this.artworksSignal().map(art => 
          art.id === id ? obraAtualizada : art
        );
        this.artworksSignal.set(listaModificada);
      })
    );
  }

  deleteArtwork(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`).pipe(
      tap(() => {
        // Remove o item excluído diretamente do Signal na memória do app
        const listaAtualizada = this.artworksSignal().filter(art => art.id !== id);
        this.artworksSignal.set(listaAtualizada);
      })
    );
  }
}