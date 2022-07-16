import { Document } from "mongoose";

/**
 * Author: Sanika Tamhankar
 * BannerID: B00909848
 * Email: sn295037@dal.ca
 */

//Interface for User
export default interface Users extends Document {
  userID: string;
  first_name: string;
  last_name:string;
  email: string;
  phone: string;
  account: string;
  risk_appetite: string;
  address: string;
  credits: number;
}
