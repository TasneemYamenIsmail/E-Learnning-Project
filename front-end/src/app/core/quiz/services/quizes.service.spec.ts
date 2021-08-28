import { TestBed } from '@angular/core/testing';

import { QuizesService } from './quizes.service';

describe('QuizesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuizesService = TestBed.get(QuizesService);
    expect(service).toBeTruthy();
  });
});
