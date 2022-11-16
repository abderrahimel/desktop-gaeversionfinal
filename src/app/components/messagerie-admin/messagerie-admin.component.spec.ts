import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagerieAdminComponent } from './messagerie-admin.component';

describe('MessagerieAdminComponent', () => {
  let component: MessagerieAdminComponent;
  let fixture: ComponentFixture<MessagerieAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagerieAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagerieAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
