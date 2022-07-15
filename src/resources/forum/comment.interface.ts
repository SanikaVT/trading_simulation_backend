import { Document } from "mongoose";

/**
 * Author: Sanika Tamhankar
 * BannerID: B00909848
 * Email: sn295037@dal.ca
 */
export default interface Comment extends Document {
  userID: string
  symbol: string;
  commentID: string;
  comment: string;
  creation_date: string;
}
