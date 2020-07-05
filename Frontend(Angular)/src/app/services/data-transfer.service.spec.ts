/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataTransferService } from './data-transfer.service';

describe('Service: DataTransfer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataTransferService]
    });
  });

  it('should ...', inject([DataTransferService], (service: DataTransferService) => {
    expect(service).toBeTruthy();
  }));
});
