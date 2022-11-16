import { TestBed } from '@angular/core/testing';

import { ProtectRouteGuardGuard } from './protect-route-guard.guard';

describe('ProtectRouteGuardGuard', () => {
  let guard: ProtectRouteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtectRouteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
