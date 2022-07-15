"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * Author: Sanika Tamhankar
 * BannerID: B00909848
 * Email: sn295037@dal.ca
 */
const CommentSchema = new mongoose_1.Schema({
    userID: { type: String, required: true },
    symbol: { type: String, required: true },
    commentID: { type: String, required: true },
    comment: { type: String, required: true },
    creation_date: { type: String, required: true },
});
CommentSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = (0, mongoose_1.model)("Comment", CommentSchema);
