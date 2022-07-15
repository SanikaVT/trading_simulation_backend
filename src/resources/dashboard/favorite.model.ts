//defining model and schema for favorite stocks



/**
 * Author: Dharmik Hiteshkumar Soni
 * BannerID: B00867641
 * Email: dh657288@dal.ca
 */


import { number } from "joi";
import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import Favorite from "./favorite.interface";

const FavoriteSchema = new Schema({
  id: { type: ObjectId, required: true },
  stocks: { type: Array, required: true },
});

export default model<Favorite>("favorites", FavoriteSchema);
