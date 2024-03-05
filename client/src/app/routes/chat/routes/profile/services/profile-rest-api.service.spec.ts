import { TestBed } from '@angular/core/testing';

import { ProfileRestApiService } from './profile-rest-api.service';

describe('ProfileRestApiService', () => {
  let service: ProfileRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
