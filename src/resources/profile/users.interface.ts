import { Document } from "mongoose";

export default interface Users extends Document {
  // id:Object;
  userID: number;
  email: string;
  phone: string;
  account: string;
  risk_appetite: string;
  address: string;
  credits: number;
}
