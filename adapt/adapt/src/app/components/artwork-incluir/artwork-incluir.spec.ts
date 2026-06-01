import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtworkIncluir } from './artwork-incluir';

describe('ArtworkIncluir', () => {
  let component: ArtworkIncluir;
  let fixture: ComponentFixture<ArtworkIncluir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtworkIncluir],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtworkIncluir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
