import { Document } from "mongoose";

//Author: Sanika Tamhankar B00909848
export default interface Comment extends Document {
  userID: string
  symbol: string;
  commentID: string;
  comment: string;
  creation_date: string;
}
