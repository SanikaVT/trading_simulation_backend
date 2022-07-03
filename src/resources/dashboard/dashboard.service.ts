/**
 * Data Model interfaces
 */

import Stock from "./stock.interface";
import stockModel from "./stock.model";

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

  public findAllRecommended() {
    let stockList = this.stock.find();
    return stockList;
  }

  public findAllFavorite() {
    let stockList = this.stock.find({ isFavorite: true });
    return stockList;
  }
}
