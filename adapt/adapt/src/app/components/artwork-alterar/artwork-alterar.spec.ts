import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtworkAlterar } from './artwork-alterar';

describe('ArtworkAlterar', () => {
  let component: ArtworkAlterar;
  let fixture: ComponentFixture<ArtworkAlterar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtworkAlterar],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtworkAlterar);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('obra', {
      id: 1,
      descricao: 'Teste',
      tipoArt: 'Digital',
      img: 'https://placehold.co/60x60',
      privado: false,
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
