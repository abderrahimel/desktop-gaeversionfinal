import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourTheoriqueModalComponent } from './cour-theorique-modal.component';

describe('CourTheoriqueModalComponent', () => {
  let component: CourTheoriqueModalComponent;
  let fixture: ComponentFixture<CourTheoriqueModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourTheoriqueModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourTheoriqueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
