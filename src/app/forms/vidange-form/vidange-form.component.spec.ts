import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VidangeFormComponent } from './vidange-form.component';

describe('VidangeFormComponent', () => {
  let component: VidangeFormComponent;
  let fixture: ComponentFixture<VidangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VidangeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VidangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
