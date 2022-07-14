import { Document } from "mongoose";

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
