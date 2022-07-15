"use strict";
/**
 * Author: Dharmik Hiteshkumar Soni
 * BannerID: B00867641
 * Email: dh657288@dal.ca
 */
Object.defineProperty(exports, "__esModule", { value: true });
//stock schema
const mongoose_1 = require("mongoose");
const StockSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    currency: { type: String, required: true },
    price: { type: Number, required: true },
    high: { type: Number, required: true },
    low: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)("stocks", StockSchema);
