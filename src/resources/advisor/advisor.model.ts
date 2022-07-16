// author: qiwei sun
// date: 2022/07/15
import { Schema, model } from "mongoose";
import Advisor from "./advisor.interface";

// create a advisor shceme
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
        title:{ type: String, enum:['mr','miss','mrs','ms']},
        fullName: { type:String, required:true}
    }
);
export default model<Advisor>("Advisor", AdvisorSchema);
