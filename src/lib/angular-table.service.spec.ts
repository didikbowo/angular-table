import { TestBed } from '@angular/core/testing';

import { AngularTableService } from './angular-table.service';

describe('AngularTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularTableService = TestBed.get(AngularTableService);
    expect(service).toBeTruthy();
  });
});
