import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourPratiqueModalComponent } from './cour-pratique-modal.component';

describe('CourPratiqueModalComponent', () => {
  let component: CourPratiqueModalComponent;
  let fixture: ComponentFixture<CourPratiqueModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourPratiqueModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourPratiqueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
