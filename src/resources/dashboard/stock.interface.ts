
//stock interface



/**
 * Author: Dharmik Hiteshkumar Soni
 * BannerID: B00867641
 * Email: dh657288@dal.ca
 */


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
