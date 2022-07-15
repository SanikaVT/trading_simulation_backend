"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Author: Sampada Thakkar
 * BannerID: B00893022
 * Email: sm223034@dal.ca
 */
const mongoose_1 = require("mongoose");
const AnalyticsSchema = new mongoose_1.Schema({
    Symbol: { type: String, required: true },
    Date: { type: String, required: true },
    Percentage: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)("yearly_analytics", AnalyticsSchema);
