import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseInfoComponent } from './depense-info.component';

describe('DepenseInfoComponent', () => {
  let component: DepenseInfoComponent;
  let fixture: ComponentFixture<DepenseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenseInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
