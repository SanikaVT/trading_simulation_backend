


/**
 * Author: Dharmik Hiteshkumar Soni
 * BannerID: B00867641
 * Email: dh657288@dal.ca
 */

//defining inteface for favorite stocks
import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export default interface Favorite extends Document {
  id: ObjectId;
  stocks: [string];
}
