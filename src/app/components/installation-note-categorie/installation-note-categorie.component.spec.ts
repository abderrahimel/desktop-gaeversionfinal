import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationNoteCategorieComponent } from './installation-note-categorie.component';

describe('InstallationNoteCategorieComponent', () => {
  let component: InstallationNoteCategorieComponent;
  let fixture: ComponentFixture<InstallationNoteCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallationNoteCategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationNoteCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
