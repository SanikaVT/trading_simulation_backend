import { Schema, model } from "mongoose";
import Comment from "./comment.interface";

//Author: Sanika Tamhankar B00909848
const CommentSchema = new Schema(
  {
    userID: { type: String, required: true },
    symbol: { type: String, required: true },
    commentID: { type: String, required: true },
    comment: { type: String, required: true },
    creation_date: { type: String, required: true },
  
  }
);

CommentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<Comment>("Comment", CommentSchema);
