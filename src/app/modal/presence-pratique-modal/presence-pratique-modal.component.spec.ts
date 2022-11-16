import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresencePratiqueModalComponent } from './presence-pratique-modal.component';

describe('PresencePratiqueModalComponent', () => {
  let component: PresencePratiqueModalComponent;
  let fixture: ComponentFixture<PresencePratiqueModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresencePratiqueModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresencePratiqueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
