import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtworkListar } from './artwork-listar';

describe('ArtworkListar', () => {
  let component: ArtworkListar;
  let fixture: ComponentFixture<ArtworkListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtworkListar],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtworkListar);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('artworks', []);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
