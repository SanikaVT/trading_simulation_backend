"use strict";
//defining model and schema for favorite stocks
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const FavoriteSchema = new mongoose_1.Schema({
    id: { type: mongodb_1.ObjectId, required: true },
    stocks: { type: Array, required: true },
});
exports.default = (0, mongoose_1.model)("favorites", FavoriteSchema);
