import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { drinkDetalleComponent } from './drink-detalle.component';

describe('drinkDetalleComponent', () => {
  let component: drinkDetalleComponent;
  let fixture: ComponentFixture<drinkDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [drinkDetalleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(drinkDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
