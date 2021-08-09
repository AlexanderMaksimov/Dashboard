/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { IntroService } from './Intro.service';

describe('Service: Intro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntroService]
    });
  });

  it('should ...', inject([IntroService], (service: IntroService) => {
    expect(service).toBeTruthy();
  }));
});
