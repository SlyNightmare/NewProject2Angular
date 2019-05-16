import { TestBed, inject } from '@angular/core/testing';

import { SongsDisplayedService } from './songs-displayed.service';

describe('SongsDisplayedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SongsDisplayedService]
    });
  });

  it('should be created', inject([SongsDisplayedService], (service: SongsDisplayedService) => {
    expect(service).toBeTruthy();
  }));
});
