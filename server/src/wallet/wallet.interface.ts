/* eslint-disable prettier/prettier */
export interface Wallet {
  _id?: string;
  address: string;
  balance: number;
  isOld: boolean;
  balanceInEur: number;
  balanceInUsd: number;
}