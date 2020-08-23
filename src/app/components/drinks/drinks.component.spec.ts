import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { drinksComponent } from './drinks.component';

describe('drinkesComponent', () => {
  let component: drinksComponent;
  let fixture: ComponentFixture<drinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [drinksComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(drinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
