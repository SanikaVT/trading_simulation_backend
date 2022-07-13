import { Document } from "mongoose";

export default interface Analytics extends Document {
  Symbol: String;
  Date: String;
  Percentage: Number;
  
}
