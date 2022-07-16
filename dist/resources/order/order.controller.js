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
/**
 * Author: Udit Gandhi
 */
const express_1 = require("express");
const order_service_1 = __importDefault(require("../../resources/order/order.service"));
const order_model_1 = __importDefault(require("../order/order.model"));
const users_service_1 = __importDefault(require("../profile/users.service"));
const rn = require("random-number");
class OrderController {
    constructor() {
        this.path = "/order";
        this.router = (0, express_1.Router)();
        this.OrderService = new order_service_1.default();
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, symbol, quantity, price, orderType, currentMargin } = req.body;
                const options = {
                    min: 12345,
                    max: 20000,
                    integer: true,
                };
                const order = new order_model_1.default();
                order.userID = userId;
                order.orderID = rn(options);
                order.symbol = symbol;
                order.quantity = quantity;
                order.price = price;
                order.timestamp = new Date();
                if (orderType === "Buy")
                    order.status = "Placed";
                else
                    order.status = "Executed";
                order.orderType = orderType;
                const createdOrder = yield this.OrderService.create(order);
                if (createdOrder) {
                    const orderAmount = quantity * price;
                    const profileService = new users_service_1.default();
                    let updatedMargin = 0;
                    if (orderType === "Buy") {
                        if (currentMargin - orderAmount < 0) {
                            order.status = "Cancelled";
                            updatedMargin = currentMargin;
                        }
                        else {
                            updatedMargin = currentMargin - orderAmount;
                        }
                    }
                    else {
                        updatedMargin = currentMargin + orderAmount;
                    }
                    const user = yield profileService.updateUserCredits(userId, updatedMargin);
                    console.log(user);
                }
                else {
                    order.status = "Pending";
                    yield this.OrderService.create(order);
                }
                res.sendStatus(201);
            }
            catch (error) {
                console.log(error.message);
                res.sendStatus(500);
                //next(new HttpException(400, error.message));
            }
        });
        this.getOrders = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.OrderService.getOrders();
                res.send({ orders });
            }
            catch (error) {
                console.log(error.message);
                res.sendStatus(500);
            }
        });
        this.getStockCount = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, symbol } = req.query;
                const count = yield this.OrderService.getStockCount(userId, symbol);
                res.send({ count });
            }
            catch (error) {
                console.log(error.message);
                res.sendStatus(500);
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}`, this.create);
        this.router.get(`${this.path}`, this.getOrders);
        this.router.get(`${this.path}/stockcount`, this.getStockCount);
    }
}
exports.default = OrderController;
