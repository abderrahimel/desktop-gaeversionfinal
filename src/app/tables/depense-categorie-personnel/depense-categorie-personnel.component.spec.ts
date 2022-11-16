import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseCategoriePersonnelComponent } from './depense-categorie-personnel.component';

describe('DepenseCategoriePersonnelComponent', () => {
  let component: DepenseCategoriePersonnelComponent;
  let fixture: ComponentFixture<DepenseCategoriePersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenseCategoriePersonnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenseCategoriePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
