import { TestBed } from '@angular/core/testing';

import { PerformanceReviewService } from './performance-review.service';

describe('PerformanceReviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerformanceReviewService = TestBed.get(PerformanceReviewService);
    expect(service).toBeTruthy();
  });
});
