/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { DataHandlerService } from './DataHandler.service';

describe('Service: DataHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataHandlerService]
    });
  });

  it('should ...', inject([DataHandlerService], (service: DataHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
