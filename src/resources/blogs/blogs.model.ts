/**

 * Author: Dharmay Sureja

 * BannerID: B00904061

 * Email:dh276903@dal.ca

 */
// blog model responsible for communicating data with mongodb


import { Schema, model } from "mongoose";
import Blogs from "./blogs.interface";

const BlogsSchema = new Schema(
  {
    blogsID: { type: String, required: true },
    userID: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, required: true },
  }
);

BlogsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<Blogs>("blogs", BlogsSchema);
