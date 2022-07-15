import { Document } from "mongoose";

//Author: Prakrut Suthar
export default interface News extends Document {
  newsID: string;
  userID: string;
  news_topic: string;
  news_content: string;
}
