/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WalletSchema } from './wallet.schema';
import { Wallet } from './wallet.interface';




@Injectable()
export class WalletModel {
  constructor(@InjectModel('Wallet') private walletModel: Model<Wallet>) {}

  async create(wallet: Wallet): Promise<Wallet> {
    const createdWallet = new this.walletModel(wallet);
    return createdWallet.save();
  }

  async findAll(): Promise<Wallet[]> {
    return this.walletModel.find().exec();
  }
}
