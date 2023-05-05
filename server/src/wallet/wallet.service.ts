/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './wallet.interface';




@Injectable()
export class WalletService {
  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<Wallet>,
  ) {}

  async findAll(): Promise<Wallet[]> {
    return this.walletModel.find().exec();
  }

  async findByAddress(address: string): Promise<Wallet> {
    return this.walletModel.findOne({ address }).exec();
  }

  async save(wallet: Wallet): Promise<Wallet> {
    const newWallet = new this.walletModel(wallet);
    return newWallet.save();
  }

  async delete(id: string): Promise<Wallet> {
    return this.walletModel.findByIdAndDelete(id).exec();
  }
}
