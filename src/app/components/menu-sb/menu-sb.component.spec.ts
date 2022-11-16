import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSBComponent } from './menu-sb.component';

describe('MenuSBComponent', () => {
  let component: MenuSBComponent;
  let fixture: ComponentFixture<MenuSBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
