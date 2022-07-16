/**
 * Author: Dharmay Dineshchandra Sureja
 * BannerID: B00904061
 * Email: dh276903@dal.ca
 */

// Defined Interface maping


import { Document } from "mongoose";

export default interface Register extends Document {
  userID: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  credits: number;
  account: String;
  risk_appetite: string;
  // timestamp: Date;
}
