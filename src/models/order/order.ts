const uniqueValidator = require("mongoose-unique-validator");
import { model, Schema, Document } from "mongoose";

export interface IOrder extends Document {
  orderID: number;
  symbol: string;
  quantity: number;
  price: number;
  timestamp: Date;
  status: string;
  orderType: string;
  //placedBy: string;
}

const OrderSchema: Schema = new Schema({
  orderID: { type: String, required: true },
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  timestamp: { type: String, required: true },
  status: ["Cancelled", "Pending", "Placed"],
  orderType: ["Buy", "Sell"],
  /*placedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },*/
});

//OrderSchema.plugin(uniqueValidator);

export default model<IOrder>("orders", OrderSchema);
