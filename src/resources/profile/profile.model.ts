import { Schema, model } from "mongoose";
import Profile from "./profile.interface";

const ProfileSchema = new Schema(
  {
    userID: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    account: { type: String, required: true },
    risk_appetite: { type: String, enum: ["High", "Medium", "Low"] },
    credits: { type: Number, required: true},
  }
);

ProfileSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<Profile>("Profile", ProfileSchema);
