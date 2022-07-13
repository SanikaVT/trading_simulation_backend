/**
 * Data Model interfaces
 */

import stockModel from "./stock.model";
import favoriteModel from "./favorite.model";

import console from "console";

/**
 * MongoDB
 * store all stocks from DB to a list
 */

/**
 * Service class
 * methods to provide all stocks to the controller
 */

export default class DashboardService {
  private stock = stockModel;
  private favorite = favoriteModel;

  public findAllRecommended() {
    let stockList = this.stock.find();
    return stockList;
  }

  public findAllFavorite() {
    let favoriteStocks = this.favorite.find({ userId: 1 });

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
