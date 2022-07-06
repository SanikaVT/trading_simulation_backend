import { Document } from "mongoose";

export default interface Profile extends Document {
  userID: number;
  email: string;
  phone: string;
  account: string;
  risk_appetite: string;
  address: string;
  credits: number;
}
