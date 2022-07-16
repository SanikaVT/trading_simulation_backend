import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import CommentService from "../forum/comment.service";
import CommentModel from "../forum/comment.model";
const rn = require("random-number");

/**
 * Author: Sanika Tamhankar
 * BannerID: B00909848
 * Email: sn295037@dal.ca
*/
export default class CommentController implements Controller {
  public path = "/forum";
  public router = Router();
  private CommentService = new CommentService();
  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}`, this.addComment);
    this.router.get(`${this.path}`, this.getCommentsList);
    this.router.put(`${this.path}`, this.updateComment);
    this.router.put(`${this.path}/delete`, this.deleteComment);

  }

  private addComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userID, symbol, comment} = req.body;
      const options = {
        min: 12345,
        max: 20000,
        integer: true,
      };
      const comments = new CommentModel();
      comments.userID=userID;
      comments.symbol = symbol;
      comments.commentID = rn(options).toString();
      comments.comment = comment;
      comments.creation_date = new Date().toString();
      const createComment = await this.CommentService.addComment(comments);

      res.sendStatus(201);
    } catch (error: any) {
      console.log("C"+error.message);
    }
  };

  private getCommentsList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const symbol= req.query.symbol;
      const comments = await this.CommentService.getCommentsList(symbol);
      res.send({ comments });
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };

  private updateComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {  symbol, commentID, comment } = req.body;
      const comments = new CommentModel();
      comments.symbol = symbol;
      comments.commentID = commentID;
      comments.comment = comment;
      comments.creation_date = new Date().toString();
      const updateComment = await this.CommentService.updateComment(comments);

      res.sendStatus(201);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  private deleteComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { symbol, commentID} = req.body;
      console.log(req.query.commentID);
      const comment = await this.CommentService.deleteComment(symbol,commentID);
      res.send({ comment });
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };
}
