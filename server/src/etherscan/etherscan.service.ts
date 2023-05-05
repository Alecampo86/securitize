import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EtherscanService {
  private apiKey = process.env.API_KEY;
  private apiUrl = 'https://api.etherscan.io/api';

  //checks if there is a transaction longer than a year ago
  async getTransactions(walletAddress: string) {
    const url = `${this.apiUrl}?module=account&action=txlist&address=${walletAddress}&apikey=${this.apiKey}`;
    const response = await axios.get(url);
    const transactions = response.data.result;
    const oneYearAgo = Math.floor(Date.now() / 1000) - 31536000; // One year ago in Unix timestamp
    const isOld = transactions.some(
      (tx) => parseInt(tx.timeStamp) < oneYearAgo,
    );
    return isOld;
  }

  async getBalance(walletAddress: string) {
    const url = `${this.apiUrl}?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${this.apiKey}`;
    const response = await axios.get(url);
    const balance = parseInt(response.data.result) / 1000000000000000000; // Convert wei to ether
    return balance;
  }

  async getExchangeRates() {
    const url =
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur,usd';
    const response = await axios.get(url);
    const exchangeRates = response.data.ethereum;
    return exchangeRates;
  }
}
