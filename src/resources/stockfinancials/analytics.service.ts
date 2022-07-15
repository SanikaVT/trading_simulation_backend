/**
 * Author: Sampada Thakkar
 * BannerID: B00893022
 * Email: sm223034@dal.ca
 */
import YearlyAnalyticsModel from "./yearly_analytics.model";
import Analytics from "./analytics.interface";

export default class AnalyticsService {
  private yearlyanalytics = YearlyAnalyticsModel;


  public async getAnalytics(symbol:any): Promise<Analytics[]> {
    //Getting financial data
    try {
      const filtered_analytics = await this.yearlyanalytics.find({Symbol:symbol});
      return filtered_analytics;
    } catch (err) {
      throw new Error("Unable to get orders.");
    }
  }
}
