import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OfferDto } from '../dto';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Get()
  public getOffers() {
    return this.offersService.getOffers();
  }

  @Get('/status/:status')
  public getStatusOffers(@Param('status') status: any) {
    return this.offersService.getStatusOffers(status);
  }

  @Get('/:id')
  public getOffer(@Param('id') id: any) {
    return this.offersService.getOffer(parseInt(id));
  }

  @Post()
  public createOffer(@Body() offer: OfferDto) {
    return this.offersService.createOffer(offer);
  }

  @Put('/:id')
  public updateOffer(@Param('id') id: any, @Body() offer: OfferDto) {
    return this.offersService.updateOffer(parseInt(id), offer);
  }

  @Delete('/:id')
  public deleteOffer(@Param('id') id: any) {
    return this.offersService.deleteOffer(parseInt(id));
  }
}
