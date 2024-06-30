import { Test, TestingModule } from '@nestjs/testing';
import { RandomizeService } from './randomize.service';

describe('RandomizeService', () => {
  let service: RandomizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomizeService],
    }).compile();

    service = module.get<RandomizeService>(RandomizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('passing 4 should generate a string', ()=>{
    expect(typeof service.generate(4)).toBe('string')
  })

  it('passing 4 should generate a 4 characters', async ()=>{
    expect((await service.generate(4)).length).toEqual(4)
  })

});
