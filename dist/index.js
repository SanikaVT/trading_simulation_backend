"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Author: Udit Gandhi
 */
require("dotenv/config");
require("module-alias/register");
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const app_1 = __importDefault(require("./app"));
const order_controller_1 = __importDefault(require("./resources/order/order.controller"));
const dashboard_controller_1 = __importDefault(require("./resources/dashboard/dashboard.controller"));
const users_controller_1 = __importDefault(require("./resources/profile/users.controller"));
const comment_controller_1 = __importDefault(require("./resources/forum/comment.controller"));
const register_controller_1 = __importDefault(require("./resources/register/register.controller"));
const analytics_controller_1 = __importDefault(require("./resources/yearlyanalytics/analytics.controller"));
const analytics_controller_2 = __importDefault(require("./resources/halfyearlyanalytics/analytics.controller"));
const analytics_controller_3 = __importDefault(require("./resources/stockfinancials/analytics.controller"));
const advisor_controller_1 = __importDefault(require("./resources/advisor/advisor.controller"));
const appointment_controller_1 = __importDefault(require("./resources/appointmen/appointment.controller"));
const { PORT, MONGODB_URL } = require("./config/config");
(0, validateEnv_1.default)();
const app = new app_1.default([
    new dashboard_controller_1.default(),
    new users_controller_1.default(),
    new order_controller_1.default(),
    new comment_controller_1.default(),
    new register_controller_1.default(),
    new analytics_controller_1.default(),
    new analytics_controller_2.default(),
    new analytics_controller_3.default(),
    new advisor_controller_1.default(),
    new appointment_controller_1.default(),
], Number(PORT), MONGODB_URL);
app.listen();
