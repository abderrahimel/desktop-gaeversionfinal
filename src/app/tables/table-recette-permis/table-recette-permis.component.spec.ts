import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRecettePermisComponent } from './table-recette-permis.component';

describe('TableRecettePermisComponent', () => {
  let component: TableRecettePermisComponent;
  let fixture: ComponentFixture<TableRecettePermisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRecettePermisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRecettePermisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
