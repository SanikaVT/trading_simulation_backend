/**
 * Author: Dharmik Hiteshkumar Soni
 * BannerID: B00867641
 * Email: dh657288@dal.ca
 */

//Creating endpoints
//Controllers will call services where all business logics will be performed
import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import DashboardService from "./dashboard.service";

export default class DashboardController implements Controller {
  public path = "/dashboard";
  public router = Router();
  private dashboardService = new DashboardService();

  constructor() {
    this.initialiseRoutes();
  }

  //initializing endpoints here
  private initialiseRoutes(): void {
    this.router.post(`${this.path}`, this.getRecommendedStocks);
    this.router.post(`${this.path}/favorite`, this.getFavoriteStocks);
    this.router.post(`${this.path}/favorites`, this.addToFavorites);
    this.router.delete(`${this.path}/delete`, this.deleteFromFavorite);
  }

  //get request for recommended stocks
  private getRecommendedStocks = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const userId = req.body.userId;

      const user = await this.dashboardService.findUserRisk(userId);

      let stocks = await this.dashboardService.findAllRecommendedStocks();
      let recommendedStocks = [];
      switch (user[0].risk_appetite) {
        case "High":
          let high_difference = 200;
          recommendedStocks = stocks.filter((stock: any) => {
            let dif = stock.high - stock.low;
            console.log(dif);
            if (dif > high_difference) {
              console.log("dif", dif);
              return stock;
            }
          });
          console.log("stocks", stocks);
          res.send({ recommendedStocks });
          break;
        case "Low":
          let low_difference = 200;
          recommendedStocks = stocks.filter((stock: any) => {
            let dif = stock.high - stock.low;
            console.log(dif);
            if (dif <= low_difference) {
              console.log("dif", dif);
              return stock;
            }
          });
          res.send({ recommendedStocks });
          break;
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  //get request for all favorite stocks
  private getFavoriteStocks = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const userId = req.body.userId;
      let favoriteStocks = await this.dashboardService.findAllFavorite(userId);
      console.log("favorites are", favoriteStocks[0].stocks);
      const favorites = await this.dashboardService.findAllFavoriteStocks(
        favoriteStocks[0].stocks
      );

      console.log("hello", favorites);

      res.send({ favorites });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  //post request for favorite stocks
  private addToFavorites = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    //add a stock id got in req to the favorites table in a current user
    const user = req.body.user;
    const stock = req.body.stock;
    //call function of a service to add this stock in db
    let result = await this.dashboardService.addFavoriteStock(user, stock);
    console.log(result);
    const updated = await this.dashboardService.findAllFavoriteStocks(result);

    res.send(updated);
  };

  //delete request for favorite stocks
  private deleteFromFavorite = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    //add a stock id got in req to the favorites table in a current user
    const user = req.body.user;
    const stock = req.body.stock;

    //call function of a service to add this stock in db
    let result = await this.dashboardService.deleteStock(user, stock);
    console.log(result);
    const updated = await this.dashboardService.findAllFavoriteStocks(result);

    res.send(updated);
  };
}
