"use strict";
/**
 * Author: Dharmay Dineshchandra Sureja
 * BannerID: B00904061
 * Email: dh276903@dal.ca
 */
Object.defineProperty(exports, "__esModule", { value: true });
// register model responsible for communicating data with mongodb
const mongoose_1 = require("mongoose");
const RegisterSchema = new mongoose_1.Schema({
    userID: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    credits: { type: Number, required: true },
    account: { type: String, required: true },
    // timestamp: { type: Date, required: true },
    risk_appetite: { type: String, enum: ["Low", "Medium", "High"] },
    // orderType: { type: String, enum: ["Buy", "Sell"] },
}, { timestamps: true });
RegisterSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = (0, mongoose_1.model)("users", RegisterSchema);
