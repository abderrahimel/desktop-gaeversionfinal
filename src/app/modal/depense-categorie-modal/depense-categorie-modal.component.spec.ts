import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseCategorieModalComponent } from './depense-categorie-modal.component';

describe('DepenseCategorieModalComponent', () => {
  let component: DepenseCategorieModalComponent;
  let fixture: ComponentFixture<DepenseCategorieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenseCategorieModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenseCategorieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
