import { Document } from "mongoose";

export default interface Order extends Document {
  userID: string;
  orderID: number;
  symbol: string;
  quantity: number;
  price: number;
  timestamp: Date;
  status: string;
  orderType: string;
}
