import HoldingsModel from "../holdings/holdings.model";
import Holdings from "../holdings/holdings.interface";

export default class HoldingsService {
  private holdings = HoldingsModel;

  public async create(holdings: Holdings): Promise<Holdings> {
    try {
      const createdHoldings = await this.holdings.create(holdings);
      return createdHoldings;
    } catch (err) {
      throw new Error("Unable to create holding.");
    }
  }

  public async getHoldings(): Promise<Holdings[]> {
    try {
      const holdings = await this.holdings.find();
      return holdings;
    } catch (err) {
      throw new Error("Unable to get holdings.");
    }
  }
}
