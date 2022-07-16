// author: qiwei sun
// date: 2022/07/15
import { Document } from "mongoose";

// create a advisor model interface
export default interface Advisor extends Document {
    id:number
    email: string
    firstName: string;
    lastName: string;
    phoneNumber: number;
    age: number;
    address: String;
    image:String;
    title:String;
    fullName:String
}
