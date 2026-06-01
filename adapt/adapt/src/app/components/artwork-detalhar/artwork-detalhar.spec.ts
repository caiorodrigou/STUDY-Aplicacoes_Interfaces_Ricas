import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtworkDetalhar } from './artwork-detalhar';

describe('ArtworkDetalhar', () => {
  let component: ArtworkDetalhar;
  let fixture: ComponentFixture<ArtworkDetalhar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtworkDetalhar],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtworkDetalhar);
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
