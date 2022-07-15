/**

 * Author: Prakrut Suthar

 * BannerID: B00885349

 * Email:prakrut@dal.ca

*/

import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import NewsService from "../news/news.service";
import NewsModel from "../news/news.model";
const rn = require("random-number");

export default class CommentController implements Controller {
  public path = "/news";
  public router = Router();
  private NewsService = new NewsService();
  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}`, this.addNews);
    this.router.get(`${this.path}`, this.getNewsList);
    this.router.put(`${this.path}`, this.updateNews);
    this.router.put(`${this.path}/delete`, this.deleteNews);

  }

  private addNews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userID, news_topic, news_content} = req.body;
      const options = {
        min: 12345,
        max: 20000,
        integer: true,
      };
      const news = new NewsModel();
      news.userID = userID;
      news.newsID = rn(options).toString();
      news.news_topic = news_topic;
      news.news_content = news_content;
      const createComment = await this.NewsService.addNews(news);

      res.sendStatus(201);
    } catch (error: any) {
      console.log("C"+error.message);
    }
  };

  private getNewsList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const news = await this.NewsService.getNewsList();
      res.send({ news: news });
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };

  private updateNews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userID, newsID, news_topic,  news_content } = req.body;
      const news = new NewsModel();
      news.userID = userID;
      news.newsID = newsID;
      news.news_topic = news_topic;
      news.news_content = news_content;
      const updateNews = await this.NewsService.updateNews(news);

      res.sendStatus(201);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  private deleteNews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userID, newsID} = req.body;
      console.log(req.query.userID);
      const news = await this.NewsService.deleteNews(userID,newsID);
      res.send({ news });
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };
}
