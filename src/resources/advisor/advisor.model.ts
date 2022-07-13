import { Schema, model } from "mongoose";
import Advisor from "./advisor.interface";

const AdvisorSchema = new Schema(
    {
        id:{type:Number,require:true},
        email: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        age: { type: Number, required: true },
        address: { type: String, required: true },
        image:{ type: String,require: true },
        title:{ type: String, enum:['mr','miss','mrs','ms']}
    }
);
export default model<Advisor>("Advisor", AdvisorSchema);
