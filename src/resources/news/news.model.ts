import { Schema, model } from "mongoose";
import News from "./news.interface";

//Author: Prakrut Suthar
const NewsSchema = new Schema(
  {
    newsID: { type: String, required: true },
    userID: { type: String, required: true },
    news_topic: { type: String, required: true },
    news_content: { type: String, required: true },
  
  }
);

NewsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<News>("News", NewsSchema);
