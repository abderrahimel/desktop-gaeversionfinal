import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveAutoEcoleComponent } from './archive-auto-ecole.component';

describe('ArchiveAutoEcoleComponent', () => {
  let component: ArchiveAutoEcoleComponent;
  let fixture: ComponentFixture<ArchiveAutoEcoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveAutoEcoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveAutoEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
