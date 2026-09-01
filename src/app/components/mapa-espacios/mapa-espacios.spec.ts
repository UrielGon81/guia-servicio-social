import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaEspaciosComponent } from './mapa-espacios';

describe('MapaEspaciosComponent', () => {
  let component: MapaEspaciosComponent;
  let fixture: ComponentFixture<MapaEspaciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaEspaciosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapaEspaciosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});