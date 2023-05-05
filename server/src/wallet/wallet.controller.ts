/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';

import { WalletService } from './wallet.service';
import { EtherscanService } from 'src/etherscan/etherscan.service';
import { Wallet } from './wallet.interface';


@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly etherscanService: EtherscanService,
  ) {}

  @Get('/find')
  async findAll(): Promise<Wallet[]> {
    return this.walletService.findAll();
  }

  @Get('/find/:address')
async findByAddress(@Param('address') address: string): Promise<Wallet> {
  return this.walletService.findByAddress(address);
}

  @Post('/create')
  async save(@Body() wallet: Wallet): Promise<Wallet> {
    return this.walletService.save(wallet);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<Wallet> {
    return this.walletService.delete(id);
  }

  @Get('/transactions/:walletAddress')
  async getTransactions(@Param('walletAddress') walletAddress: string) {
    const transactions = await this.etherscanService.getTransactions(
      walletAddress,
    );
    return transactions;
  }

  @Get('/balance/:walletAddress')
  async getBalance(@Param('walletAddress') walletAddress: string) {
    const balance = await this.etherscanService.getBalance(walletAddress);
    return balance;
  }

  @Get('/exchange_rates')
  async getExchangeRates() {
    const rates = await this.etherscanService.getExchangeRates();
    return rates;
  }
}
