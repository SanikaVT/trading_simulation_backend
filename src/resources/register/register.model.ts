import { Schema, model } from "mongoose";
import Register from "./register.interface";

const RegisterSchema = new Schema(
  {
    userID: { type: String, required: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
      phone: { type: Number, required: true },
    address: { type: String, required: true },
      credits: { type: Number, required: true },
    creditCard: { type: Number, required: true },
    // timestamp: { type: Date, required: true },
     riskappetite: { type: String, enum: ["Low", "Medium", "High"] },
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

export default model<Register>("users", RegisterSchema);
