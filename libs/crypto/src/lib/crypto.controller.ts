import { Body, Controller, Delete, Get, HttpStatus, NotAcceptableException, NotFoundException, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crypto } from '@prisma/client';
import { CryptoService } from './crypto.service';
import { CryptoDto } from '../dto';

@Controller('cryptos')
export class CryptoController {
  constructor(private cryptoService: CryptoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  public async getCryptos() {
    const cryptos = await this.cryptoService.getCryptos();
    if(cryptos && cryptos.length === 0) throw new NotFoundException();
    return this.cryptoService.getCryptos();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  public async getCrypto(@Param('id') id:any) {
    const crypto = await this.cryptoService.getCrypto(parseInt(id));
    if(!crypto) throw new NotFoundException();
    return this.cryptoService.getCrypto(parseInt(id));
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('/new')
  public async createCrypto(@Body() crypto: CryptoDto) {
    const { symbol, name } = crypto;
    //check if symbol or name is already in use
    const cryptoS = await this.cryptoService.getCryptoBySymbol(symbol);
    if(cryptoS) throw new NotAcceptableException('Crypto already exists');
    const cryptoN = await this.cryptoService.getCryptoByName(name);
    if(cryptoN) throw new NotAcceptableException('Crypto already exists');
    return await this.cryptoService.createCrypto(crypto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  public async updateCrypto(@Param('id') id:any, @Body() crypto: CryptoDto) {
    return this.cryptoService.updateCrypto(parseInt(id), crypto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  public async deleteCrypto(@Param('id') id:any) {
    const crypto = await this.cryptoService.getCrypto(parseInt(id));
    if(!crypto) throw new NotFoundException();
    return this.cryptoService.deleteCrypto(parseInt(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/toogle/:id')
  public async updateStatus(@Param('id') id) {
    const crypto = await this.cryptoService.getCrypto(parseInt(id));
    if(!crypto) throw new NotFoundException();
    return this.cryptoService.toogleStatus(parseInt(id));
  }
}
