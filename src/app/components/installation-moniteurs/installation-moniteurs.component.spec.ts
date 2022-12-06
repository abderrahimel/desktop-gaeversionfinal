import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationMoniteursComponent } from './installation-moniteurs.component';

describe('InstallationMoniteursComponent', () => {
  let component: InstallationMoniteursComponent;
  let fixture: ComponentFixture<InstallationMoniteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallationMoniteursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationMoniteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
