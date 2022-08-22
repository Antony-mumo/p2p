import { Injectable } from '@nestjs/common';
import { Crypto, PrismaClient } from '@prisma/client';
import { it } from 'node:test';

const prisma = new PrismaClient()

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
export class CryptoService {
    public async getCryptos(): Promise<Crypto[]> {
        return await prisma.crypto.findMany({});
    }

    public async getCrypto(id: number): Promise<Crypto> {
        return await prisma.crypto.findUnique({
            where: {
                id,
            }
        });
    }

    public async createCrypto(crypto: any): Promise<Crypto> {
        try {
            const newcrypto = await prisma.crypto.create({
                data: crypto,
            });
    
            return newcrypto;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async updateCrypto(id: number, crypto: any): Promise<Crypto> {
        return await prisma.crypto.update({
            where: {
                id,
            },
            data: crypto,
        });
    }

    public async deleteCrypto(id: number): Promise<Crypto> {
        return await prisma.crypto.delete({
            where: {
                id,
            },
        });
    }

    public async toogleStatus(id: number): Promise<Crypto> {
        const crypto = await prisma.crypto.findUnique({
            where: {
                id,
            }
        })
        if(crypto.isActive) {
            return await prisma.crypto.update({
                where: {
                    id,
                },
                data: {
                    isActive: false,
                },
            });
        } else {
            return await prisma.crypto.update({
                where: {
                    id,
                },
                data: {
                    isActive: true,
                }
            })
        } 
    }

    public async getCryptoByName(name: string): Promise<Crypto> {
        return await prisma.crypto.findFirst({
            where: {
                name,
            }
        });
    }

    public async getCryptoBySymbol(symbol: string): Promise<Crypto> {
        return await prisma.crypto.findFirst({
            where: {
                symbol,
            }
        });
    }
}
