/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EtherscanService } from './etherscan/etherscan.service';
import { WalletController } from './wallet/wallet.controller';
import { WalletService } from './wallet/wallet.service';
import { WalletModule } from './wallet/wallet.module';
import { EtherscanModule } from './etherscan/etherscan.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://Alex:WaxoK516uYkR1VA2@cluster0.ogwrdep.mongodb.net/?retryWrites=true&w=majority"),
    WalletModule,
    EtherscanModule
  ],
  controllers: [AppController, WalletController],
  providers: [AppService, EtherscanService, WalletService],
})
export class AppModule {}
