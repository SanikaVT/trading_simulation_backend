/**

 * Author: Dharmay Sureja

 * BannerID: B00904061

 * Email:dh276903@dal.ca

 */

import { Document } from "mongoose";

export default interface Blogs extends Document {
  blogsID: string;
  userID: string;
  title: string;
  description: string;
  content: string;
  likes: number;
}
