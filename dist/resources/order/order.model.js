"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Author: Udit Gandhi
 */
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    userID: { type: String, required: true },
    orderID: { type: String, required: true },
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    status: {
        type: String,
        enum: ["Cancelled", "Pending", "Placed", "Executed"],
    },
    orderType: { type: String, enum: ["Buy", "Sell"] },
}, { timestamps: true });
OrderSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = (0, mongoose_1.model)("Order", OrderSchema);
