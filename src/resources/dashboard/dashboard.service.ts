/**
 * Data Model interfaces
 */


/**
 * Author: Dharmik Hiteshkumar Soni
 * BannerID: B00867641
 * Email: dh657288@dal.ca
 */


import stockModel from "./stock.model";
import favoriteModel from "./favorite.model";
import usersModel from "../profile/users.model";

import console from "console";
import { Types } from "mongoose";
import stockInterface from "./stock.interface";

/**
 * Service class
 * methods to provide all  recommended and favorite stocks to the controller
 */

export default class DashboardService {
  private stock = stockModel;
  private favorite = favoriteModel;
  private user = usersModel;
  public highStocks = [];
  public lowStocks = [];
  public stockList = [];

  public findUserRisk(id: any) {
    console.log("inside");
    let user = this.user.find({ userID: id });
    return user;
  }

  findAllRecommendedStocks() {
    //logic to get back stocks matching this risk_appetite
    let stocks = this.stock.find();
    return stocks;
  }

  public findAllFavorite(id:any) {
    let favoriteStocks = this.favorite.find({ userId: id });
    return favoriteStocks;
  }

  public findAllFavoriteStocks(favoriteStocks: any) {
    console.log("here");
    console.log(favoriteStocks);

    let ids = favoriteStocks.map(function (el: string) {
      console.log(el);

      console.log("updated", el);
      return el.toString();
    });

    return this.stock.aggregate(
      [{ $match: { symbol: { $in: ids } } }],
      function (err: any, data: any) {
        if (err) {
          console.log(err);
        }
        console.log("in function return =====", data);
        return data;
      }
    );
  }

  //add a favorite stock
  async addFavoriteStock(user: any, stock: any) {
    console.log("user", typeof user);
    console.log("stock", typeof stock);
    console.log("in favorite service");
    let res = await this.favorite.findOneAndUpdate(
      {
        userId: user,
      },
      {
        $addToSet: {
          stocks: stock.toString(),
        },
      },
      {
        new: true,
      }
    );
    return res?.stocks;
  }

  async deleteStock(user: any, stock: any) {
    console.log("inside delete");
    let res = await this.favorite.findOneAndUpdate(
      {
        userId: user,
      },
      {
        $pull: {
          stocks: stock.toString(),
        },
      },
      {
        new: true,
      }
    );
    return res?.stocks;
  }
}
