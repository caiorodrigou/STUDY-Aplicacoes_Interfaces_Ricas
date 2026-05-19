import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Adicionar_Art } from './adicionar_art';

describe('AddArt', () => {
  let component: Adicionar_Art;
  let fixture: ComponentFixture<Adicionar_Art>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adicionar_Art],
    }).compileComponents();

    fixture = TestBed.createComponent(Adicionar_Art);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
