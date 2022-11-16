import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDepensePersonnelComponent } from './table-depense-personnel.component';

describe('TableDepensePersonnelComponent', () => {
  let component: TableDepensePersonnelComponent;
  let fixture: ComponentFixture<TableDepensePersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDepensePersonnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDepensePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
