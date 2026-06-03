import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iartwork } from '../model/artwork';

@Injectable({
  providedIn: 'root',
})
export class ArtworkService {
  private artworksSubject = new BehaviorSubject<Iartwork[]>([
    {
      id: 1,
      img: 'https://via.placeholder.com/300x400?text=Digital+Art+1',
      descricao: 'Obra Digital 1',
      tipoArt: 'Digital',
      privado: false,
    },
    {
      id: 2,
      img: 'https://via.placeholder.com/300x400?text=Moderna+Art',
      descricao: 'Obra Moderna',
      tipoArt: 'Moderna',
      privado: false,
    },
  ]);

  private nextId = 3;

  constructor() {}

  getArtworks(): Observable<Iartwork[]> {
    return this.artworksSubject.asObservable();
  }

  getAllArtworks(): Iartwork[] {
    return this.artworksSubject.getValue();
  }


  getArtworkById(id: number): Iartwork | undefined {
    const artworks = this.artworksSubject.getValue();
    return artworks.find((artwork) => artwork.id === id);
  }


  createArtwork(artwork: Omit<Iartwork, 'id'>): Iartwork {
    const newArtwork: Iartwork = {
      ...artwork,
      id: this.nextId++,
    };

    const currentArtworks = this.artworksSubject.getValue();
    this.artworksSubject.next([...currentArtworks, newArtwork]);

    return newArtwork;
  }

  // Atualizar artwork existente
  updateArtwork(id: number, artwork: Partial<Iartwork>): Iartwork | undefined {
    const currentArtworks = this.artworksSubject.getValue();
    const index = currentArtworks.findIndex((a) => a.id === id);

    if (index === -1) {
      return undefined;
    }

    const updatedArtwork: Iartwork = {
      ...currentArtworks[index],
      ...artwork,
      id, 
    };

    const updatedArtworks = [...currentArtworks];
    updatedArtworks[index] = updatedArtwork;
    this.artworksSubject.next(updatedArtworks);

    return updatedArtwork;
  }

  // Remover artwork
  deleteArtwork(id: number): boolean {
    const currentArtworks = this.artworksSubject.getValue();
    const filteredArtworks = currentArtworks.filter((a) => a.id !== id);

    if (filteredArtworks.length === currentArtworks.length) {
      return false; 
    }

    this.artworksSubject.next(filteredArtworks);
    return true;
  }
}
