import "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validateEnv";
import App from "./app";
import PostController from "./resources/post/post.controller";
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

validateEnv();
const app = new App(
  [new PostController(), new OrderController(), new DashboardController(),
    new PostController(), new OrderController(), new UsersController(), new CommentController(), new RegisterController(), new YearlyAnalyticsController(), new HalfYearlyAnalyticsController(), new StockFinancialsController(), new AdvisorController(), new AppointmentController()],
  Number(PORT),
  MONGODB_URL
);
app.listen();
