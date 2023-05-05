/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

export const WalletSchema = new Schema({
  address: { type: String, required: true },
  balance: { type: Number, required: true },
  isOld: { type: Boolean, required: true },
  balanceInEur: { type: Number, required: true },
  balanceInUsd: { type: Number, required: true },
});
