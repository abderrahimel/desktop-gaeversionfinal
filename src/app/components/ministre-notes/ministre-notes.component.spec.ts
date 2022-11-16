import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistreNotesComponent } from './ministre-notes.component';

describe('MinistreNotesComponent', () => {
  let component: MinistreNotesComponent;
  let fixture: ComponentFixture<MinistreNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinistreNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistreNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
