import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaimentCandidatModalComponent } from './paiment-candidat-modal.component';

describe('PaimentCandidatModalComponent', () => {
  let component: PaimentCandidatModalComponent;
  let fixture: ComponentFixture<PaimentCandidatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaimentCandidatModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaimentCandidatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
