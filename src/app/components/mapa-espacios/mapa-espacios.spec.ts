import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaEspacios } from './mapa-espacios';

describe('MapaEspacios', () => {
  let component: MapaEspacios;
  let fixture: ComponentFixture<MapaEspacios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaEspacios],
    }).compileComponents();

    fixture = TestBed.createComponent(MapaEspacios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
