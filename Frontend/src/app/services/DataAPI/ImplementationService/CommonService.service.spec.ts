/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommonService } from './CommonService.service';

describe('Service: CommonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonService]
    });
  });

  it('should ...', inject([CommonService], (service: CommonService) => {
    expect(service).toBeTruthy();
  }));
});
