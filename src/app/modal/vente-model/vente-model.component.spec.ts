import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteModelComponent } from './vente-model.component';

describe('VenteModelComponent', () => {
  let component: VenteModelComponent;
  let fixture: ComponentFixture<VenteModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
