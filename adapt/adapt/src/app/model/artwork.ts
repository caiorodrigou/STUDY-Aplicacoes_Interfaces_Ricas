export type TipoArt = 'Digital' | 'Moderna' | 'Classica' | 'Abstrata' | 'Escultura' | 'Fotografia';

export interface Iartwork {
    id: number;
    img: URL;
    descricao:string;
    tipoArt: TipoArt;
    privado: true;
}