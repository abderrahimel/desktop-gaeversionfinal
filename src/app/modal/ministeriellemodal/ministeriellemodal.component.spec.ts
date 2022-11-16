import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinisteriellemodalComponent } from './ministeriellemodal.component';

describe('MinisteriellemodalComponent', () => {
  let component: MinisteriellemodalComponent;
  let fixture: ComponentFixture<MinisteriellemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinisteriellemodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinisteriellemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
