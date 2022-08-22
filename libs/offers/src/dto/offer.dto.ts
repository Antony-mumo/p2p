// import { IsEmail, IsNotEmpty, IsString } from "class-validator";

import { IsNotEmpty, IsString } from "class-validator";

export class OfferDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    cryptoId: number;

    @IsNotEmpty()
    fiatId: number;

    @IsNotEmpty()
    durationId: number;

    @IsNotEmpty()
    @IsString()
    priceType: string;

    @IsNotEmpty()
    @IsString()
    p2pType: string;

    @IsNotEmpty()
    offerType: string;

    @IsNotEmpty()
    maximumAmount: number;

    @IsNotEmpty()
    minimumAmount: number;

    margin: number;
    fixedRate: number;

    @IsString()
    offerTerms: string;
    tradeInstructions: string;

}