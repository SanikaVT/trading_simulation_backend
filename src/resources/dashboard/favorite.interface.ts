import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export default interface Favorite extends Document {
  id: ObjectId;
  stocks: [string];
}
