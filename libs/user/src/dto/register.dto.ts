import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class RegisterDTO {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

