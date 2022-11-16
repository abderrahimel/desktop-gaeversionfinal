import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteexamenModalComponent } from './noteexamen-modal.component';

describe('NoteexamenModalComponent', () => {
  let component: NoteexamenModalComponent;
  let fixture: ComponentFixture<NoteexamenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteexamenModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteexamenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
