// author: qiwei sun
// date: 2022/07/15

import { Document } from "mongoose";
// Appointment interface
export default interface Appointment extends Document {
    id:number 
    email:String
    firstName: string;
    lastName: string;
    age:number;
    address: string;
    date:Date,
    userID:number
}
