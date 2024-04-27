import { TestBed } from '@angular/core/testing';

import { SheredataService } from './sheredata.service';

describe('SheredataService', () => {
  let service: SheredataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheredataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
