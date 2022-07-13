import { Document } from "mongoose";

export default interface Appointment extends Document {
    id:number 
    email:String
    firstName: string;
    lastName: string;
    age:number;
    address: string;
    date:Date
}
