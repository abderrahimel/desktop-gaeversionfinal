import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoniteurAdminmodalComponent } from './moniteur-adminmodal.component';

describe('MoniteurAdminmodalComponent', () => {
  let component: MoniteurAdminmodalComponent;
  let fixture: ComponentFixture<MoniteurAdminmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoniteurAdminmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoniteurAdminmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
