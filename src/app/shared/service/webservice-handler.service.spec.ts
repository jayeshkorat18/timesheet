import { TestBed, inject } from '@angular/core/testing';

import { WebserviceHandlerService } from './webservice-handler.service';

describe('WebserviceHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebserviceHandlerService]
    });
  });

  it('should be created', inject([WebserviceHandlerService], (service: WebserviceHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
