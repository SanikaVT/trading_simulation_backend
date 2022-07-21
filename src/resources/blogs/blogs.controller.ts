/**

 * Author: Dharmay Sureja

 * BannerID: B00904061

 * Email:dh276903@dal.ca

*/

import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import BlogsServices from "../blogs/blogs.service";
import BlogsModel from "../blogs/blogs.model";
const rn = require("random-number");

export default class BlogsController implements Controller {
  public path = "/blogs";
  public router = Router();
  private BlogsService = new BlogsServices();
  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {

    //initialise all api endpoints
    this.router.post(`${this.path}`, this.updateBlogs);
    this.router.get(`${this.path}`, this.getBlogsList);
    this.router.post(`${this.path}/details`, this.getDetails);
    this.router.put(`${this.path}`, this.addBlogs);
    this.router.post(`${this.path}/delete`, this.deleteBlogs);
    this.router.post(`${this.path}/like`, this.likeBlogs);

  }
// to add blog to database
  private addBlogs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userID, title, description, content} = req.body;
      const options = {
        min: 12345,
        max: 20000,
        integer: true,
      };
      const blogs = new BlogsModel();
      blogs.userID = userID;
      blogs.blogsID = rn(options).toString();
      blogs.title = title;
      blogs.description = description;
      blogs.content = content;
      blogs.likes = 0;
      const addBlogs = await this.BlogsService.addBlogs(blogs);

      res.sendStatus(201);
    } catch (error: any) {
      console.log("C"+error.message);
    }
  };

//get all blogs
  private getBlogsList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const blogs = await this.BlogsService.getBlogsList();
      res.send({ blogs: blogs });
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };

  //get details of a blog
  private getDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { blogsID } = req.body;
      console.log("blogs id are here",blogsID);
      const blogs = await this.BlogsService.getDetails(blogsID);
      res.send({ blogs: blogs });
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };

//like a log
  private likeBlogs = async (
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { blogsID } = req.body;
      console.log("blogs id are here",blogsID);
      const blogs = await this.BlogsService.getDetails(blogsID);
      const likecount = blogs.likes+1;
      const addlike = await this.BlogsService.addLike(blogsID,likecount);
       
       res.send({ blogs: blogs });
    } catch (error: any) {
      console.log(error.message);
      
    }
  };

//update a blog
  private updateBlogs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userID, blogsID, title,  description, content } = req.body;
      const blogs = new BlogsModel();
      blogs.userID = userID;
      blogs.blogsID = blogsID;
      blogs.title = title;
      blogs.description = description;
      blogs.content = content;
      const updateBlogs = await this.BlogsService.updateBlogs(blogs);

      res.sendStatus(201);
    } catch (error: any) {
      console.log(error.message);
    }
  };

//delete a blog
  private deleteBlogs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { blogsID} = req.body;
      console.log("blogs id are here",blogsID);
      
      const blogs = await this.BlogsService.deleteBlogs(blogsID);
      res.send({ blogs });
    } catch (error: any) {
      console.log(error.message);
     
    }
  };
}
