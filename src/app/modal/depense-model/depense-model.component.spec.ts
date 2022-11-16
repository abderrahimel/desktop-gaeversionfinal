import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseModelComponent } from './depense-model.component';

describe('DepenseModelComponent', () => {
  let component: DepenseModelComponent;
  let fixture: ComponentFixture<DepenseModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenseModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenseModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
