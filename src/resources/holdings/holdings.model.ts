import { Schema, model } from "mongoose";
import Holdings from "./holdings.interface";

const HoldingsSchema = new Schema(
  {
    holdingsID: { type: String, required: true },
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, required: true },
  },
  { timestamps: true }
);

HoldingsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<Holdings>("Holdings", HoldingsSchema);
