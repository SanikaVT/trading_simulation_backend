/**
 * Author: Udit Gandhi
 * BannerID: B00889579
 * Email: udit.gandhi@dal.ca
 */
import "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validateEnv";
import App from "./app";
import OrderController from "./resources/order/order.controller";
import DashboardController from "./resources/dashboard/dashboard.controller";
import UsersController from "./resources/profile/users.controller";
import CommentController from "./resources/forum/comment.controller";
import RegisterController from "./resources/register/register.controller";
import YearlyAnalyticsController from "./resources/yearlyanalytics/analytics.controller";
import HalfYearlyAnalyticsController from "./resources/halfyearlyanalytics/analytics.controller";
import StockFinancialsController from "./resources/stockfinancials/analytics.controller";
import AdvisorController from "./resources/advisor/advisor.controller";
import AppointmentController from "./resources/appointmen/appointment.controller";
const { PORT, MONGODB_URL } = require("./config/config");
import NewsController from "./resources/news/news.controller";
import BlogsController from "./resources/blogs/blogs.controller";
import CommentsController from "./resources/comments/comments.controller";

/**
 * Creats an application object where all the controllers are intialized and inserted into the application object.
 */

validateEnv();
const app = new App(
  [
    new DashboardController(),
    new UsersController(),
    new OrderController(),
    new CommentController(),
    new RegisterController(),
    new YearlyAnalyticsController(),
    new HalfYearlyAnalyticsController(),
    new StockFinancialsController(),
    new AdvisorController(),
    new AppointmentController(),
    new NewsController(),
      new BlogsController(),
      new CommentsController(),
  ],
  Number(PORT),
  MONGODB_URL
);
app.listen();
