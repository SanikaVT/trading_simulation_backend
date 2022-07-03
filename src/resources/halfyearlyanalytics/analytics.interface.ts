import { Document } from "mongoose";

export default interface Analytics extends Document {
  Symbol: String;
  Date: Date;
  Percentage: Number;
  
}
