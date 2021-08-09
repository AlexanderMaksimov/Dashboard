/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StatService } from './StatService.service';

describe('Service: StatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatService]
    });
  });

  it('should ...', inject([StatService], (service: StatService) => {
    expect(service).toBeTruthy();
  }));
});
