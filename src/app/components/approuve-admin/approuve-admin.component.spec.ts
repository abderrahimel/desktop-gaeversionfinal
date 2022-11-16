import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprouveAdminComponent } from './approuve-admin.component';

describe('ApprouveAdminComponent', () => {
  let component: ApprouveAdminComponent;
  let fixture: ComponentFixture<ApprouveAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprouveAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprouveAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
