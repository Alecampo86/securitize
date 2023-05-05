/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema } from './wallet.schema';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletModel } from './wallet.model';
import { EtherscanModule } from 'src/etherscan/etherscan.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }]),
    EtherscanModule
  ],
  controllers: [WalletController],
  providers: [WalletService, WalletModel],
  exports: [WalletService, MongooseModule],
})
export class WalletModule {}
