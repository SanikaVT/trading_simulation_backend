/**
 * Author: Sampada Thakkar
 * BannerID: B00893022
 * Email: sm223034@dal.ca
 */
import { Schema, model } from "mongoose";
import Analytics from "./analytics.interface";

const AnalyticsSchema = new Schema(
  {
    Symbol: { type: String, required: true },
    Date: { type: String, required: true },
    Percentage: { type: Number, required: true },
  },
);

export default model<Analytics>("yearly_analytics", AnalyticsSchema);
