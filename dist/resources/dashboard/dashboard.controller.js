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
//Creating endpoints
//Controllers will call services where all business logics will be performed
const express_1 = require("express");
const dashboard_service_1 = __importDefault(require("./dashboard.service"));
const rn = require("random-number");
class DashboardController {
    constructor() {
        this.path = "/dashboard";
        this.router = (0, express_1.Router)();
        this.dashboardService = new dashboard_service_1.default();
        this.getRecommendedStocks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const recommendedStocks = yield this.dashboardService.findAllRecommended();
                res.send({ recommendedStocks });
            }
            catch (error) {
                console.log(error.message);
            }
        });
        this.getFavoriteStocks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const favoriteStocks = yield this.dashboardService.findAllFavorite();
                res.send({ favoriteStocks });
            }
            catch (error) {
                console.log(error.message);
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.get(`${this.path}`, this.getRecommendedStocks);
        this.router.get(`${this.path}/favorites`, this.getFavoriteStocks);
    }
}
exports.default = DashboardController;
