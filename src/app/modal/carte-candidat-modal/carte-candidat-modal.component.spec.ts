import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteCandidatModalComponent } from './carte-candidat-modal.component';

describe('CarteCandidatModalComponent', () => {
  let component: CarteCandidatModalComponent;
  let fixture: ComponentFixture<CarteCandidatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarteCandidatModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteCandidatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
