"use strict";
/**
 * Data Model interfaces
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stock_model_1 = __importDefault(require("./stock.model"));
/**
 * MongoDB
 * store all stocks from DB to a list
 */
/**
 * Service class
 * methods to provide all stocks to the controller
 */
class DashboardService {
    constructor() {
        this.stock = stock_model_1.default;
    }
    findAllRecommended() {
        let stockList = this.stock.find();
        return stockList;
    }
    findAllFavorite() {
        let stockList = this.stock.find({ isFavorite: true });
        return stockList;
    }
}
exports.default = DashboardService;
