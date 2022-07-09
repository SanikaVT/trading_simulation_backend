import { Document } from "mongoose";

export default interface Comment extends Document {
  analyticsID: string;
  commentID: string;
  comment: string;
  creation_date: string;
}
