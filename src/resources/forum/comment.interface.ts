import { Document } from "mongoose";

//Author: Sanika Tamhankar B00909848
export default interface Comment extends Document {
  analyticsID: string;
  commentID: string;
  comment: string;
  creation_date: string;
}
