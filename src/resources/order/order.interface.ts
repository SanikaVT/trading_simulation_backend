/**
 * Author: Udit Gandhi
 * BannerID: B00889579
 * Email: udit.gandhi@dal.ca
 */
import { Document } from "mongoose";

//Creates an interface type for the user
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
