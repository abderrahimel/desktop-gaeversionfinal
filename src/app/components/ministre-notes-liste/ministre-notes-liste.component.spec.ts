import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistreNotesListeComponent } from './ministre-notes-liste.component';

describe('MinistreNotesListeComponent', () => {
  let component: MinistreNotesListeComponent;
  let fixture: ComponentFixture<MinistreNotesListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinistreNotesListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistreNotesListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
