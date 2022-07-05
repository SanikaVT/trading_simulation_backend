import { Document } from "mongoose";

export default interface Holdings extends Document {
  holdingsID: number;
  symbol: string;
  quantity: number;
  price: number;
  timestamp: Date;
}
