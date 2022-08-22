import { OffersModule } from '@jua/offers';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [OffersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
