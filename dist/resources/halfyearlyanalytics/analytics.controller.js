"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_service_1 = __importDefault(require("./analytics.service"));
class HalfYearlyAnalyticsController {
    constructor() {
        this.path = "/halfyearlyanalytics";
        this.router = (0, express_1.Router)();
        this.AnalyticsService = new analytics_service_1.default();
        this.getAnalytics = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const analytics = yield this.AnalyticsService.getAnalytics();
                res.send({ analytics });
            }
            catch (error) {
                console.log(error.message);
                //next(new HttpException(400, error.message));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.get(`${this.path}`, this.getAnalytics);
    }
}
exports.default = HalfYearlyAnalyticsController;
