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
const order_service_1 = __importDefault(require("../../resources/order/order.service"));
const order_model_1 = __importDefault(require("../order/order.model"));
const rn = require("random-number");
class OrderController {
    constructor() {
        this.path = "/order";
        this.router = (0, express_1.Router)();
        this.OrderService = new order_service_1.default();
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { symbol, quantity, price, orderType } = req.body;
                const options = {
                    min: 12345,
                    max: 20000,
                    integer: true,
                };
                const order = new order_model_1.default();
                order.orderID = rn(options);
                order.symbol = symbol;
                order.quantity = quantity;
                order.price = price;
                order.timestamp = new Date();
                order.status = "Placed";
                order.orderType = orderType;
                const createdOrder = yield this.OrderService.create(order);
                res.sendStatus(201);
            }
            catch (error) {
                console.log(error.message);
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
                //next(new HttpException(400, error.message));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}`, this.create);
        this.router.get(`${this.path}`, this.getOrders);
    }
}
exports.default = OrderController;
