import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forms_Art } from './forms';

describe('AdicionarArt', () => {
  let component: Forms_Art;
  let fixture: ComponentFixture<Forms_Art>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Forms_Art],
    }).compileComponents();

    fixture = TestBed.createComponent(Forms_Art);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
