import YearlyAnalyticsModel from "./yearly_analytics.model";
import Analytics from "./analytics.interface";

export default class AnalyticsService {
  private yearlyanalytics = YearlyAnalyticsModel;
  public async getAnalytics(symbol:any): Promise<Analytics[]> {
    try {
      console.log(symbol)
      const filtered_analytics = await this.yearlyanalytics.find({Symbol:symbol});
      return filtered_analytics;
    } catch (err) {
      throw new Error("Unable to get orders.");
    }
  }
}
