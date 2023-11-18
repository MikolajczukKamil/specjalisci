import { TestBed } from '@angular/core/testing';

import { GeneralInterceptor } from './general.interceptor';

describe('GeneralInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GeneralInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GeneralInterceptor = TestBed.inject(GeneralInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
