/**
 * Author: Sampada Thakkar
 * BannerID: B00893022
 * Email: sm223034@dal.ca
 */
import { Document } from "mongoose";

export default interface Analytics extends Document {
  //Getting financial interface
  Symbol: String;
  Date: String;
  Profit: Number;
  
}
