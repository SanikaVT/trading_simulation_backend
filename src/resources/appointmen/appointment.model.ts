// author: qiwei sun
// date: 2022/07/15
import { Schema, model } from "mongoose";
import Appointment from "./appointment.interface";
// defind an appointmentSchema
const AppointmentSchema = new Schema(
    {
        id:{type:Number,require:true},
        email: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: Number, required: true },
        address: { type: String, required: true },
        date: { type:Date, require: true },
        fullName: { type:String, require: true},
        userID:{ type:Number, require: true}
    }
);
export default model<Appointment>("Appointment", AppointmentSchema);
