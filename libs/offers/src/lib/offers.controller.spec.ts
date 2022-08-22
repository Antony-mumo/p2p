import { ForbiddenException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Offer } from '@prisma/client';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

const data = {
  "chainId": "asdfjalsdkjflajdsfas",
  "contractAddress": "eurwoeurowiuerwoer",
  "userId": 1,
  "cryptoId": 2,
  "fiatId": 1,
  "durationId": 1,
  "priceType": "MARKET",
  "p2pType": "SECURE",
  "offerType": "BUY",
  "maximumAmount": 1200,
  "minimumAmount": 60,
  "margin": 2,
  "fixedRate": 0,
  "offerTerms": "This are my offer terms for my trade. They have come from postman",
  "tradeInstructions": "This are my trade instructions. They have come from postman",
  "status": "ACTIVE"
}

describe('OffersController', () => {
  let controller: OffersController;
  let service: OffersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [OffersService],
      controllers: [OffersController],
    }).compile();

    controller = module.get(OffersController);
    service = module.get(OffersService);
  })

  describe('getOffers', () => {
    //it should return an array of offers
    it('should return an array of offers', async () => {
      const offers = await controller.getOffers();
      expect(offers).toBeInstanceOf(Array);
    })
    it('should return an array with objects', async () => {
      const offers = await controller.getOffers();
      if(offers.length > 0) {
        //check if single object has some properties id, userId, status, user, crypto, fiat, duration
        expect(offers[0]).toHaveProperty('user');
      }
    })
    it('should not return any object with deletedAt not null', async () => {
      const offers = await controller.getOffers();
      offers?.map(offer => {
        expect(offer.deletedAt).toBeNull();
      })
    })
  })

  describe('getStatusOffers', () => {
    //should return an array of offers based on status passed as a parameter
    it('should return an array of offers', async () => {
      const offers = await controller.getStatusOffers('ACTIVE');
      expect(offers).toBeInstanceOf(Array);
    })
    it('should return an array with each object having an ACTIVE status', async () => {
      const offers = await controller.getStatusOffers('ACTIVE');
      offers?.map(offer => {
        expect(offer.status).toBe('ACTIVE');
      })
    })
  })

  describe('getOffer', () => {
    //should return an error if offer does not exist
    it('should return an error if offer does not exist', async () => {
      const offer = await controller.getOffer(1);
      if(!offer) {
        expect(offer).toEqual(null);
      }
    })
    //should return an offer based on id passed as a parameter
    it('should return an offer based on id passed as a parameter', async () => {
      const offer = await controller.getOffer(2);
      if(offer) {
        expect(offer).toBeInstanceOf(Object);
      }
    })
    it('should return an object with certain properties', async () => {
      const offer = await controller.getOffer(1);
      if(offer) {
        expect(offer).toHaveProperty('user');
      }
    })
  })

  describe('createOffer', () => {
    //should create an offer and return it
    it('should return the saved offer', async () => {
      const createdOffer = await controller.createOffer(data);
      expect(createdOffer.offerTerms).toBe(data.offerTerms);
    })
  })

  describe('updateOffer', () => {
    //should be able to update an offer
    it('should be able to update an offer', () => {
      const data = {
        "userId": 1,
        "cryptoId": 2,
        "fiatId": 1,
        "durationId": 1,
        "priceType": "MARKET",
        "p2pType": "SECURE",
        "offerType": "BUY",
        "maximumAmount": 1200,
        "minimumAmount": 60,
        "margin": 2,
        "fixedRate": 0,
        "offerTerms": "This are my offer terms for my trade. They have come from postman",
        "tradeInstructions": "This are my trade instructions. They have come from postman",
        "status": "ACTIVE"
      }
      const result: any = {}
      jest.spyOn(service, 'updateOffer').mockImplementation(() => result);

      expect(controller.updateOffer(1, data)).toBe(result);
    })
  })

  describe('deleteOffer', () => {
    //should return an error if offer does not exist
    it('should return an error if offer does not exist', async () => {
      const offer = await controller.deleteOffer(1);
      if(offer == null) {
        expect(offer).toEqual(null);
      }
    })
    //should be able to delete an offer
    it('should be able to delete an offer', async () => {
      const offer = await controller.deleteOffer(1);
      if(offer != null) {
        expect(offer).toBeInstanceOf(Object);
      }
    })
    it('should have an updated deletedAt property', async () => {
      const offer = await controller.deleteOffer(1);
      if(offer != null) {
        expect(offer.deletedAt).toBeInstanceOf(Date);
      }
    })
  })
})
