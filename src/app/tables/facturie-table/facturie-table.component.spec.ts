import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturieTableComponent } from './facturie-table.component';

describe('FacturieTableComponent', () => {
  let component: FacturieTableComponent;
  let fixture: ComponentFixture<FacturieTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturieTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturieTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
