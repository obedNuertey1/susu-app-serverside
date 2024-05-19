import { Test, TestingModule } from '@nestjs/testing';
import { SearchAndPagination } from './search_and_pagination';

describe('SearchAndPagination', () => {
  let provider: SearchAndPagination;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchAndPagination],
    }).compile();

    provider = module.get<SearchAndPagination>(SearchAndPagination);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
