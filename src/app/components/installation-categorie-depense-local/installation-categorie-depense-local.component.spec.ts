import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationCategorieDepenseLocalComponent } from './installation-categorie-depense-local.component';

describe('InstallationCategorieDepenseLocalComponent', () => {
  let component: InstallationCategorieDepenseLocalComponent;
  let fixture: ComponentFixture<InstallationCategorieDepenseLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallationCategorieDepenseLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationCategorieDepenseLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
