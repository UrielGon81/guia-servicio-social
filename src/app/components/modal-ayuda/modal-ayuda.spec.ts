import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAyuda } from './modal-ayuda';

describe('ModalAyuda', () => {
  let component: ModalAyuda;
  let fixture: ComponentFixture<ModalAyuda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAyuda],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAyuda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
