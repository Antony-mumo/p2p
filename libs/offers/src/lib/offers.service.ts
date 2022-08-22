import { ForbiddenException, Injectable } from '@nestjs/common';
import { Offer, PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { OfferDto } from '../dto';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
    // Check incoming query type
      if (params.action === 'findUnique' || params.action === 'findFirst') {
        // Change to findFirst - you cannot filter
        // by anything except ID / unique with findUnique
        params.action = 'findFirst'
        // Add 'deleted' filter
        // ID filter maintained
        params.args.where['deletedAt'] = null
      }
      if (params.action === 'findMany') {
        // Find many queries
        if (params.args.where) {
          if (params.args.where.deletedAt == undefined) {
            // Exclude deleted records if they have not been explicitly requested
            params.args.where['deletedAt'] = null
          }
        } else {
          params.args['where'] = { deletedAt: null }
        }
      }

      //softdeletes
      if (params.action == 'delete') {
        // Delete queries
        // Change action to an update
        params.action = 'update'
        params.args['data'] = { deletedAt: new Date() }
      }
    return next(params)
  })

@Injectable()
export class OffersService {
    //getting all offers 
    public getOffers(): Promise<Offer[]> {
        return prisma.offer.findMany({
            include: {
                user: true,
                crypto: true,
                fiat: true,
                duration: true,
            }
        });
    }

    //getting all active offers
    public getStatusOffers(status: any): Promise<Offer[]> {
        const offers = prisma.offer.findMany({
            where: {
                status,
            },
            include: {
                user: true,
                crypto: true,
                fiat: true,
                duration: true,
            }
        });

        return offers;
    }

    //getting one offer
    public async getOffer(id: number): Promise<Offer> {
        if(!await this.checkIfExists(id)) {
            return null
        }
        return prisma.offer.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
                crypto: true,
                fiat: true,
                duration: true,
            }
        });
    }

    //creating an offer
    public async createOffer(offer: any): Promise<Offer> {
        try {
            const offerData = await prisma.offer.create({
                data: offer
            })
            return offerData;
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Existing details');
                }
            }
            throw error;
        }
    }

    //updating the offer
    public async updateOffer(id: number, offer: any): Promise<Offer> {
        try {
            await this.checkIfExists(id);
            const offerData = await prisma.offer.update({
                where: {
                    id
                },
                data: offer
            })
            return offerData;
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Existing details');
                }
            }
            throw error;
        }
    }

    //deleting the offer
    public async deleteOffer(id: number): Promise<Offer> {
        if(!await this.checkIfExists(id)) {
            return null
        }
        try {
            const offerData = await prisma.offer.delete({
                where: {
                    id
                }
            })
            return offerData;
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Existing details');
                }
            }
            throw error;
        }
    }

    //function to check if model exists
    private async checkIfExists(id: number): Promise<Boolean> {
        const offer = await prisma.offer.findUnique({
            where: {
                id
            }
        });
        if(!offer) {
            return false;
        }
        return true;
    }
}
