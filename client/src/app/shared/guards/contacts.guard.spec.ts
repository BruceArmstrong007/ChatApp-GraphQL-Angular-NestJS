import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { contactsGuard } from './contacts.guard';

describe('contactsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => contactsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
