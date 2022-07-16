/**

 * Author: Prakrut Suthar

 * BannerID: B00885349

 * Email:prakrut@dal.ca

*/

import { Document } from "mongoose";

export default interface News extends Document {
  newsID: string;
  userID: string;
  news_topic: string;
  news_content: string;
}
