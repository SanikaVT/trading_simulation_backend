import { Schema, model } from "mongoose";
import Users from "./users.interface";

/**
 * Author: Sanika Tamhankar
 * BannerID: B00909848
 * Email: sn295037@dal.ca
 */

//User Schema
const UsersSchema = new Schema(
  {
    userID: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    account: { type: String, required: true },
    risk_appetite: { type: String, enum: ["High", "Medium", "Low"] },
    credits: { type: Number, required: true},
  }
);

UsersSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<Users>("Users", UsersSchema);
