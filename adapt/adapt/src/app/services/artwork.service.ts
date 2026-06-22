import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Iartwork } from '../model/artwork';

@Injectable({
  providedIn: 'root',
})
export class ArtworkService {
  private http = inject(HttpClient);

  // ⚠️ ATENÇÃO: Substitua pelo endereço gerado na aba "Ports" (porta 8000) do seu Codespaces!
  private apiUrl = 'https://seu-codespace-8000.app.github.dev/api/artworks';

  // Gerenciamento de estado reativo com Signals solicitado nas notas de aula
  private artworksSignal = signal<Iartwork[]>([]);
  public artworks = this.artworksSignal.asReadonly();

  constructor() {
    // Alimenta a listagem assim que o serviço é carregado no app
    this.listarDoBackend().subscribe();
  }

  // Auxiliar interno para manter a lista do Signal sincronizada com o banco SQLite do Django
  private listarDoBackend(): Observable<Iartwork[]> {
    return this.http.get<Iartwork[]>(`${this.apiUrl}/`).pipe(
      tap((dados) => this.artworksSignal.set(dados))
    );
  }

  // 1. LISTAR (Substitui o antigo getArtworks/getAllArtworks)
  getArtworks(): Observable<Iartwork[]> {
    return this.listarDoBackend();
  }

  // 2. DETALHAR (Buscar por ID no Django REST)
  getArtworkById(id: number): Observable<Iartwork> {
    return this.http.get<Iartwork>(`${this.apiUrl}/${id}/`);
  }

  // 3. INSERIR (POST para o Django - o ID é gerado automaticamente pelo SQLite)
  createArtwork(artwork: Omit<Iartwork, 'id'>): Observable<Iartwork> {
    return this.http.post<Iartwork>(`${this.apiUrl}/`, artwork).pipe(
      tap(() => this.listarDoBackend().subscribe()) // Atualiza a tela de listagem automaticamente
    );
  }

  // 4. ATUALIZAR (PUT para o Django REST)
  updateArtwork(id: number, artwork: Partial<Iartwork>): Observable<Iartwork> {
    return this.http.put<Iartwork>(`${this.apiUrl}/${id}/`, artwork).pipe(
      tap(() => this.listarDoBackend().subscribe()) // Sincroniza o Signal após a alteração
    );
  }

  // 5. REMOVER (DELETE para o Django REST)
  deleteArtwork(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`).pipe(
      tap(() => this.listarDoBackend().subscribe()) // Remove visualmente da listagem na hora
    );
  }
}