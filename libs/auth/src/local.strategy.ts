import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./lib/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
    ) {
        super({
            usernameField: "phoneNumber",
        });
    }

    async validate(phoneNumber: string, password: string): Promise<any> {
        const user = await this.authService.validateUserCredentials(phoneNumber, password);
        console.log('user', user);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials, user not found');
        }

        return user;
    }
}