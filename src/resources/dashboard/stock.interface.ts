import { Document } from "mongoose";

export default interface Stock extends Document {
  id: number;
  symbol: string;
  price: number;
  high: number;
  low: number;
}
