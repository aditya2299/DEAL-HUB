/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreviousRouteService } from './previous-route.service';

describe('Service: PreviousRoute', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreviousRouteService]
    });
  });

  it('should ...', inject([PreviousRouteService], (service: PreviousRouteService) => {
    expect(service).toBeTruthy();
  }));
});
