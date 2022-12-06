import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationcategorieDepensePersonnelComponent } from './installationcategorie-depense-personnel.component';

describe('InstallationcategorieDepensePersonnelComponent', () => {
  let component: InstallationcategorieDepensePersonnelComponent;
  let fixture: ComponentFixture<InstallationcategorieDepensePersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallationcategorieDepensePersonnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationcategorieDepensePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
