import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
@Injectable()
export class AuthService {
    constructor(
        private jwtTokenService: JwtService,
    ) {}
    async loginWithCredentials(user: User): Promise<string> {
        const payload = { username: user.phoneNumber, sub: user.id };
        const accessToken = this.jwtTokenService.sign(payload);
        return accessToken;
    } 

    public async validateUserCredentials(username: string, password: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                phoneNumber: username,
            }
        });
        if (user && await bcrypt.compare(password, user.password)) {
            const {...result } = user;
            return result;
        }
    }
}
