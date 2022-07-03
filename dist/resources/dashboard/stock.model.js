"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StockSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    high: { type: Number, required: true },
    low: { type: Number, required: true },
    isFavorite: { type: Boolean, required: true },
});
exports.default = (0, mongoose_1.model)("stocks", StockSchema);
