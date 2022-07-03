import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import AnalyticsService from "../../resources/analytics/analytics.service";
import AnalyticsModel from "../analytics/analytics.model";

export default class AnalyticsController implements Controller {
  public path = "/analytics";
  public router = Router();
  private AnalyticsService = new AnalyticsService();
  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, this.getAnalytics);
  }

  private getAnalytics = async (
    req: Request,
    res: Response,
  ): Promise<Response | void> => {
    try {
      const analytics = await this.AnalyticsService.getAnalytics();
      console.log(analytics)
      res.send({ analytics });
    } catch (error: any) {
      console.log("Hi")
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };
}
