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
const express_1 = require("express");
const comment_service_1 = __importDefault(require("../forum/comment.service"));
const comment_model_1 = __importDefault(require("../forum/comment.model"));
const rn = require("random-number");
/**
 * Author: Sanika Tamhankar
 * BannerID: B00909848
 * Email: sn295037@dal.ca
*/
class CommentController {
    constructor() {
        this.path = "/forum";
        this.router = (0, express_1.Router)();
        this.CommentService = new comment_service_1.default();
        this.addComment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userID, symbol, comment } = req.body;
                const options = {
                    min: 12345,
                    max: 20000,
                    integer: true,
                };
                const comments = new comment_model_1.default();
                comments.userID = userID;
                comments.symbol = symbol;
                comments.commentID = rn(options).toString();
                comments.comment = comment;
                comments.creation_date = new Date().toString();
                const createComment = yield this.CommentService.addComment(comments);
                res.sendStatus(201);
            }
            catch (error) {
                console.log("C" + error.message);
            }
        });
        this.getCommentsList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const symbol = req.query.symbol;
                const comments = yield this.CommentService.getCommentsList(symbol);
                res.send({ comments });
            }
            catch (error) {
                console.log(error.message);
                //next(new HttpException(400, error.message));
            }
        });
        this.updateComment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { symbol, commentID, comment } = req.body;
                const comments = new comment_model_1.default();
                comments.symbol = symbol;
                comments.commentID = commentID;
                comments.comment = comment;
                comments.creation_date = new Date().toString();
                const updateComment = yield this.CommentService.updateComment(comments);
                res.sendStatus(201);
            }
            catch (error) {
                console.log(error.message);
            }
        });
        this.deleteComment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { symbol, commentID } = req.body;
                console.log(req.query.commentID);
                const comment = yield this.CommentService.deleteComment(symbol, commentID);
                res.send({ comment });
            }
            catch (error) {
                console.log(error.message);
                //next(new HttpException(400, error.message));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}`, this.addComment);
        this.router.get(`${this.path}`, this.getCommentsList);
        this.router.put(`${this.path}`, this.updateComment);
        this.router.put(`${this.path}/delete`, this.deleteComment);
    }
}
exports.default = CommentController;
