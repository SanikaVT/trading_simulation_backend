import { Schema, model } from "mongoose";
import Register from "./register.interface";

const RegisterSchema = new Schema(
  {
    userID: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    address: { type: String, required: true },
    creditsAvailable: { type: Number, required: true },
    creditCard: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    // status: { type: String, enum: ["Cancelled", "Pending", "Placed"] },
    // orderType: { type: String, enum: ["Buy", "Sell"] },
  },
  { timestamps: true }
);

RegisterSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<Register>("Register", RegisterSchema);
