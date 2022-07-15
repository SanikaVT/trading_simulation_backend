/**
 * Author: Udit Gandhi
 */
import { Schema, model } from "mongoose";
import Order from "./order.interface";

const OrderSchema = new Schema(
  {
    userID: { type: String, required: true },
    orderID: { type: String, required: true },
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Cancelled", "Pending", "Placed", "Executed"],
    },
    orderType: { type: String, enum: ["Buy", "Sell"] },
  },
  { timestamps: true }
);

OrderSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<Order>("Order", OrderSchema);
