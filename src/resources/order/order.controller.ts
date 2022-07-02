import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import OrderService from "../../resources/order/order.service";
import OrderModel from "../order/order.model";
const rn = require("random-number");

export default class OrderController implements Controller {
  public path = "/order";
  public router = Router();
  private OrderService = new OrderService();
  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}`, this.create);
    this.router.get(`${this.path}`, this.getOrders);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { symbol, quantity, price, orderType } = req.body;
      const options = {
        min: 12345,
        max: 20000,
        integer: true,
      };
      const order = new OrderModel();
      order.orderID = rn(options);
      order.symbol = symbol;
      order.quantity = quantity;
      order.price = price;
      order.timestamp = new Date();
      order.status = "Placed";
      order.orderType = orderType;

      const createdOrder = await this.OrderService.create(order);

      res.sendStatus(201);
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };

  private getOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const orders = await this.OrderService.getOrders();
      res.send({ orders });
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };
}
