/**
 * Author: Dharmay Dineshchandra Sureja
 * BannerID: B00904061
 * Email: dh276903@dal.ca
 */

// register model responsible for communicating data with mongodb

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
    account: { type: String, required: true },
    
     risk_appetite: { type: String, enum: ["Low", "Medium", "High"] },
    
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
