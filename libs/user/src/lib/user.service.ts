import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
    public async create(params: Prisma.UserCreateInput): Promise<User> {
        const { password } = params;       
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { ...params, password: hashedPassword }
        });
        return user;
    }

    public async validateUserCredentials(username: string, password: string): Promise<User> {
        const user = await this.findOneByPhoneNumber(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const {...result } = user;
            return result;
        }
    }

    public async findOneByPhoneNumber(phoneNumber: string): Promise<User|null> {
        return prisma.user.findFirst({
            where: {
                phoneNumber
            }
        });
    }

    public async findOneByEmail(email: string): Promise<User|null> {
        return prisma.user.findFirst({
            where: {
                email
            }
        });
    }

    public async findOneByUsername(username: string): Promise<User|null> {
        return prisma.user.findFirst({
            where: {
                username
            }
        });
    }

    public async findAll(params: Prisma.UserFindManyArgs): Promise<User[]> {
        return prisma.user.findMany(params);
    }
    
}

