import { TestBed } from '@angular/core/testing';

import { DeviceSizeService } from './device-size.service';

describe('DeviceSizeService', () => {
  let service: DeviceSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
