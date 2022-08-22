import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';

const data = {
  name: 'Bitcoin',
  symbol: 'BTC',
}

describe('CryptoController', () => {
  let controller: CryptoController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CryptoService],
      controllers: [CryptoController],
    }).compile();

    controller = module.get(CryptoController);
  });

  describe('getCryptos', () => {
    it('should return an array of cryptos', async () => {
      const cryptos = await controller.getCryptos();
      expect(cryptos).toBeInstanceOf(Array);
    })
    it('should return an array with objects', async () => {
      const cryptos = await controller.getCryptos();
      if(cryptos.length > 0) {
        //check if single object has some properties id, userId, status, user, crypto, fiat, duration
        expect(cryptos[0]).toHaveProperty('symbol');
      }
    })
    it('should not return any object with deletedAt not null', async () => {
      const cryptos = await controller.getCryptos();
      cryptos?.map(crypto => {
        expect(crypto.deletedAt).toBeNull();
      })
    })
  })

  describe('getCrypto', () => {
    it('should return an error if crypto does not exist', async () => {
      const crypto = await controller.getCrypto(1);
      if(!crypto) {
        expect(crypto).toEqual(null);
      }
    })
    it('should return a single crypto', async () => {
      const crypto = await controller.getCrypto(1);
      if(crypto) {
        expect(crypto).toBeInstanceOf(Object);
      }
    })
    it('should not return any object with deletedAt not null', async () => {
      const crypto = await controller.getCrypto(1);
      if(crypto && crypto.deletedAt) {
        expect(crypto.deletedAt).toBeNull();
      }
    })
  })
  
});
