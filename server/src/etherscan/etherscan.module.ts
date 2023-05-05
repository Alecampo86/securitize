/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { EtherscanService } from './etherscan.service';

@Module({
  imports: [],
  providers: [EtherscanService],
  exports: [EtherscanService],
})
export class EtherscanModule  {}
