/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ViewTransferService } from './view-transfer.service';

describe('Service: ViewTransfer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewTransferService]
    });
  });

  it('should ...', inject([ViewTransferService], (service: ViewTransferService) => {
    expect(service).toBeTruthy();
  }));
});
