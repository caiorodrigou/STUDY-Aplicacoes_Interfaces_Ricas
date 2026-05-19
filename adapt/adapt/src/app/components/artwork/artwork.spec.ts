import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listar_arts } from './artwork';

describe('Artwork', () => {
  let component: Listar_arts;
  let fixture: ComponentFixture<Listar_arts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listar_arts],
    }).compileComponents();

    fixture = TestBed.createComponent(Listar_arts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
