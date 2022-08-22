import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from '@jua/user';
import { AuthModule } from '@jua/auth';
import { OffersModule } from '@jua/offers';
import { CryptoModule } from '@jua/crypto';


@Module({
  imports: [
    /**
     * @required ConfigModule.forRoot()
     * We need Config Module to handle the discovery of the process.env
     * By doing so all the configuration values from connection classes will be injected into the host application
     */
     ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.local', '.env'],
    }),
    AuthModule,
    UserModule,
    OffersModule,
    CryptoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
