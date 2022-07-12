"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_model_1 = __importDefault(require("../forum/comment.model"));
//Author: Sanika Tamhankar B00909848
class CommentService {
    constructor() {
        this.comment = comment_model_1.default;
    }
    addComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdComment = yield this.comment.create(comment);
                return createdComment;
            }
            catch (err) {
                console.log(err.message);
                throw new Error("Unable to create a comment.");
            }
        });
    }
    getCommentsList(analyticsID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield this.comment.find({ analyticsID: analyticsID });
                return comments;
            }
            catch (err) {
                console.log(err.message);
                throw new Error("Unable to get comments.");
            }
        });
    }
    updateComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(comment);
                const comm = yield this.comment.findOneAndUpdate({ analyticsID: comment.analyticsID, commentID: comment.commentID }, { comment: comment.comment, creation_date: comment.creation_date });
                console.log("Success");
                return comm;
            }
            catch (err) {
                console.log(err.message);
                throw new Error("SUnable to update comment.");
            }
        });
    }
    deleteComment(analyticsID, commentID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(commentID);
                const comm = yield this.comment.findOneAndDelete({ analyticsID: analyticsID, commentID: commentID });
                console.log("Success");
                return comm;
            }
            catch (err) {
                console.log(err.message);
                throw new Error("Unable to delete comment.");
            }
        });
    }
}
exports.default = CommentService;
