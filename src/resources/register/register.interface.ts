import { Document } from "mongoose";

export default interface Register extends Document {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  password: number;
  phoneNumber: number;
  address: string;
  creditsAvailable: number;
  creditCard: number;
  timestamp: Date;
}
