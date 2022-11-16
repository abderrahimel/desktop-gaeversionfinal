import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteMinisterielleComponent } from './note-ministerielle.component';

describe('NoteMinisterielleComponent', () => {
  let component: NoteMinisterielleComponent;
  let fixture: ComponentFixture<NoteMinisterielleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteMinisterielleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteMinisterielleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
