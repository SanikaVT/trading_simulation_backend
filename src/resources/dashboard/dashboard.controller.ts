//Creating endpoints
//Controllers will call services where all business logics will be performed
import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import DashboardService from "./dashboard.service";
import stockModel from "./stock.model";
const rn = require("random-number");

export default class DashboardController implements Controller {
  public path = "/dashboard";
  public router = Router();
  private dashboardService = new DashboardService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, this.getRecommendedStocks);
    this.router.get(`${this.path}/favorites`, this.getFavoriteStocks);
  }

  private getRecommendedStocks = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const recommendedStocks =
        await this.dashboardService.findAllRecommended();
      res.send({ recommendedStocks });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  private getFavoriteStocks = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const favoriteStocks = await this.dashboardService.findAllFavorite();
      res.send({ favoriteStocks });
    } catch (error: any) {
      console.log(error.message);
    }
  };
}
