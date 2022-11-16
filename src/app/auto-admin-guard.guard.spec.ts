import { TestBed } from '@angular/core/testing';

import { AutoAdminGuardGuard } from './auto-admin-guard.guard';

describe('AutoAdminGuardGuard', () => {
  let guard: AutoAdminGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutoAdminGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
