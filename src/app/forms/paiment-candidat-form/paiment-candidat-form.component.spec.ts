import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaimentCandidatFormComponent } from './paiment-candidat-form.component';

describe('PaimentCandidatFormComponent', () => {
  let component: PaimentCandidatFormComponent;
  let fixture: ComponentFixture<PaimentCandidatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaimentCandidatFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaimentCandidatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
