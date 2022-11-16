import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRecetteGeneraleComponent } from './table-recette-generale.component';

describe('TableRecetteGeneraleComponent', () => {
  let component: TableRecetteGeneraleComponent;
  let fixture: ComponentFixture<TableRecetteGeneraleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRecetteGeneraleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRecetteGeneraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
