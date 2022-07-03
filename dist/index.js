"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const app_1 = __importDefault(require("./app"));
const post_controller_1 = __importDefault(require("./resources/post/post.controller"));
const order_controller_1 = __importDefault(require("./resources/order/order.controller"));
const analytics_controller_1 = __importDefault(require("./resources/yearlyanalytics/analytics.controller"));
const analytics_controller_2 = __importDefault(require("./resources/halfyearlyanalytics/analytics.controller"));
const analytics_controller_3 = __importDefault(require("./resources/stockfinancials/analytics.controller"));
const { PORT, MONGODB_URL } = require("./config/config");
(0, validateEnv_1.default)();
const app = new app_1.default([new post_controller_1.default(), new order_controller_1.default(), new analytics_controller_1.default(), new analytics_controller_2.default(), new analytics_controller_3.default()], Number(PORT), MONGODB_URL);
app.listen();
