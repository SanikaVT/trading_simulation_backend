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
  public async findAllRecommended(): Promise<Stock[]> {
    return [];
  }

  public async findAllFavorite(): Promise<Stock[]> {
    return [];
  }
}
