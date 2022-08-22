import { Test } from '@nestjs/testing';
import { OffersService } from './offers.service';

describe('OffersService', () => {
  let service: OffersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [OffersService],
    }).compile();

    service = module.get(OffersService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
