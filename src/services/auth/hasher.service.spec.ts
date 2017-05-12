/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Hasher } from './hasher.service';

describe('HasherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Hasher]
    });
  });

  it('should ...', inject([Hasher], (service: Hasher) => {
    expect(service).toBeTruthy();
  }));
});
