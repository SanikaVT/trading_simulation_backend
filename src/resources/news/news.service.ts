/**

 * Author: Prakrut Suthar

 * BannerID: B00885349

 * Email:prakrut@dal.ca

*/

import NewsModel from "../news/news.model";
import News from "../news/news.interface";

export default class NewsService {
  private news = NewsModel;

  public async addNews(news: News): Promise<News> {
    try {
      const create = await this.news.create(news);
      return create;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to create a news.");
    }
  }

  public async getNewsList(): Promise<any> {
    try {
      const news = await this.news.find();
      return news;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to get news.");
    }
  }

  public async updateNews(news:News): Promise<any> {
    try {
      console.log(news);
      const comm = await this.news.findOneAndUpdate({userID:news.userID,newsID:news.newsID}, {news_topic:news.news_topic,news_content:news.news_content});
      console.log("Success");
      return comm;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to update news.");
    }
  }

  public async deleteNews(userID:any,newsID:any): Promise<any> {
    try {
      console.log(newsID);
      const comm = await this.news.findOneAndDelete({userID:userID,newsID:newsID});
      console.log("Success");
      return comm;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to delete comment.");
    }
  }

}
