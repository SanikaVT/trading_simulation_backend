import "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validateEnv";
import App from "./app";
import PostController from "./resources/post/post.controller";
import OrderController from "./resources/order/order.controller";
import DashboardController from "./resources/dashboard/dashboard.controller";
import RegisterController from "@/resources/register/register.controller";
const { PORT, MONGODB_URL } = require("./config/config");

validateEnv();
const app = new App(
  [new PostController(), new OrderController(), new DashboardController(), new RegisterController()],
  Number(PORT),
  MONGODB_URL
);
app.listen();
