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
        //get request for recommended stocks
        this.getRecommendedStocks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const recommendedStocks = yield this.dashboardService.findAllRecommended();
                res.send({ recommendedStocks });
            }
            catch (error) {
                console.log(error.message);
            }
        });
        //get request for all favorite stocks
        this.getFavoriteStocks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let favoriteStocks = yield this.dashboardService.findAllFavorite();
                console.log("favorites are", favoriteStocks[0].stocks);
                const favorites = yield this.dashboardService.findAllFavoriteStocks(favoriteStocks[0].stocks);
                console.log("hello", favorites);
                res.send({ favorites });
            }
            catch (error) {
                console.log(error.message);
            }
        });
        //post request for favorite stocks
        this.addToFavorites = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //add a stock id got in req to the favorites table in a current user
            const user = req.body.user;
            const stock = req.body.stock;
            //call function of a service to add this stock in db
            let result = yield this.dashboardService.addFavoriteStock(user, stock);
            console.log(result);
            const updated = yield this.dashboardService.findAllFavoriteStocks(result);
            res.send(updated);
        });
        //delete request for favorite stocks
        this.deleteFromFavorite = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //add a stock id got in req to the favorites table in a current user
            const user = req.body.user;
            const stock = req.body.stock;
            //call function of a service to add this stock in db
            let result = yield this.dashboardService.deleteStock(user, stock);
            console.log(result);
            const updated = yield this.dashboardService.findAllFavoriteStocks(result);
            res.send(updated);
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.get(`${this.path}`, this.getRecommendedStocks);
        this.router.get(`${this.path}/favorites`, this.getFavoriteStocks);
        this.router.post(`${this.path}/favorites`, this.addToFavorites);
        this.router.delete(`${this.path}/delete`, this.deleteFromFavorite);
    }
}
exports.default = DashboardController;
