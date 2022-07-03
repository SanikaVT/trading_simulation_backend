import { Schema, model } from "mongoose";
import Stock from "./stock.interface";

const StockSchema = new Schema({
  id: { type: String, required: true },
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  high: { type: Number, required: true },
  low: { type: Number, required: true },
  isFavorite: { type: Boolean, required: true },
});

export default model<Stock>("stocks", StockSchema);
