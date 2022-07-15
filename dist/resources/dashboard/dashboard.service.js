"use strict";
/**
 * Data Model interfaces
 */
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
/**
 * Author: Dharmik Hiteshkumar Soni
 * BannerID: B00867641
 * Email: dh657288@dal.ca
 */
const stock_model_1 = __importDefault(require("./stock.model"));
const favorite_model_1 = __importDefault(require("./favorite.model"));
const users_model_1 = __importDefault(require("../profile/users.model"));
const console_1 = __importDefault(require("console"));
/**
 * Service class
 * methods to provide all  recommended and favorite stocks to the controller
 */
class DashboardService {
    constructor() {
        this.stock = stock_model_1.default;
        this.favorite = favorite_model_1.default;
        this.user = users_model_1.default;
        this.highStocks = [];
        this.lowStocks = [];
        this.stockList = [];
    }
    findUserRisk(id) {
        console_1.default.log("inside");
        let user = this.user.find({ userID: id });
        return user;
    }
    findAllRecommendedStocks() {
        //logic to get back stocks matching this risk_appetite
        let stocks = this.stock.find();
        return stocks;
    }
    findAllFavorite(id) {
        let favoriteStocks = this.favorite.find({ userId: id });
        return favoriteStocks;
    }
    findAllFavoriteStocks(favoriteStocks) {
        console_1.default.log("here");
        console_1.default.log(favoriteStocks);
        let ids = favoriteStocks.map(function (el) {
            console_1.default.log(el);
            console_1.default.log("updated", el);
            return el.toString();
        });
        return this.stock.aggregate([{ $match: { symbol: { $in: ids } } }], function (err, data) {
            if (err) {
                console_1.default.log(err);
            }
            console_1.default.log("in function return =====", data);
            return data;
        });
    }
    //add a favorite stock
    addFavoriteStock(user, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            console_1.default.log("user", typeof user);
            console_1.default.log("stock", typeof stock);
            console_1.default.log("in favorite service");
            let res = yield this.favorite.findOneAndUpdate({
                userId: user,
            }, {
                $addToSet: {
                    stocks: stock.toString(),
                },
            }, {
                new: true,
            });
            return res === null || res === void 0 ? void 0 : res.stocks;
        });
    }
    deleteStock(user, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            console_1.default.log("inside delete");
            let res = yield this.favorite.findOneAndUpdate({
                userId: user,
            }, {
                $pull: {
                    stocks: stock.toString(),
                },
            }, {
                new: true,
            });
            return res === null || res === void 0 ? void 0 : res.stocks;
        });
    }
}
exports.default = DashboardService;
