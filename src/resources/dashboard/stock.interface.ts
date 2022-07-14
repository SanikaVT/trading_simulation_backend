import { Document } from "mongoose";

export default interface Stock extends Document {
  id: number;
  symbol: string;
  name: string;
  currency: string;
  price: number;
  high: number;
  low: number;
}
