import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseCategorieLocalTableComponent } from './depense-categorie-local-table.component';

describe('DepenseCategorieLocalTableComponent', () => {
  let component: DepenseCategorieLocalTableComponent;
  let fixture: ComponentFixture<DepenseCategorieLocalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenseCategorieLocalTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenseCategorieLocalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
