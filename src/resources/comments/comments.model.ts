/**

 * Author: Dharmay Sureja

 * BannerID: B00904061

 * Email:dh276903@dal.ca

 */
// Comments model responsible for communicating data with mongodb
import { Schema, model } from "mongoose";
import Comments from "./comments.interface";

const CommentSchema = new Schema(
  {
    blogsID: { type: String, required: true },
    userID: { type: String, required: true },
    first_name: { type: String, required: true },
    commentID: { type: String, required: true },
    comment: { type: String, required: true },
   
  }
);

CommentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<Comments>("blogcomments", CommentSchema);
