import AnalyticsModel from "../analytics/analytics.model";
import Analytics from "../analytics/analytics.interface";

export default class AnalyticsService {
  private analytics = AnalyticsModel;


  public async getAnalytics(): Promise<Analytics[]> {
    try {
      const filtered_analytics = await this.analytics.find();
      console.log(filtered_analytics)
      return filtered_analytics;
    } catch (err) {
      throw new Error("Unable to get orders.");
    }
  }
}
