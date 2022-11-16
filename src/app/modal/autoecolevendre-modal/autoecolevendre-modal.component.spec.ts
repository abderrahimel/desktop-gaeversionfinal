import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoecolevendreModalComponent } from './autoecolevendre-modal.component';

describe('AutoecolevendreModalComponent', () => {
  let component: AutoecolevendreModalComponent;
  let fixture: ComponentFixture<AutoecolevendreModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoecolevendreModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoecolevendreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
