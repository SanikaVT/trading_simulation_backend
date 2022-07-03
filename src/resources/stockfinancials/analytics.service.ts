import YearlyAnalyticsModel from "./yearly_analytics.model";
import Analytics from "./analytics.interface";

export default class AnalyticsService {
  private yearlyanalytics = YearlyAnalyticsModel;


  public async getAnalytics(): Promise<Analytics[]> {
    try {
      const filtered_analytics = await this.yearlyanalytics.find();
      return filtered_analytics;
    } catch (err) {
      throw new Error("Unable to get orders.");
    }
  }
}
