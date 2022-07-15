/**
 * Author: Udit Gandhi
 */
import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import OrderService from "../../resources/order/order.service";
import OrderModel from "../order/order.model";
import ProfileService from "../profile/users.service";

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
    this.router.get(`${this.path}/stockcount`, this.getStockCount);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userId, symbol, quantity, price, orderType, currentMargin } =
        req.body;
      const options = {
        min: 12345,
        max: 20000,
        integer: true,
      };
      const order = new OrderModel();
      order.userID = userId;
      order.orderID = rn(options);
      order.symbol = symbol;
      order.quantity = quantity;
      order.price = price;
      order.timestamp = new Date();

      if (orderType === "Buy") order.status = "Placed";
      else order.status = "Executed";
      order.orderType = orderType;

      const createdOrder = await this.OrderService.create(order);
      if (createdOrder) {
        const orderAmount = quantity * price;
        const profileService = new ProfileService();
        let updatedMargin = 0;
        if (orderType === "Buy") {
          if (currentMargin - orderAmount < 0) {
            order.status = "Cancelled";
            updatedMargin = currentMargin;
          }
        } else {
          updatedMargin = currentMargin + orderAmount;
        }
        const user = await profileService.updateUserCredits(
          userId,
          updatedMargin
        );
        console.log(user);
      } else {
        order.status = "Pending";
        await this.OrderService.create(order);
      }
      res.sendStatus(201);
    } catch (error: any) {
      console.log(error.message);
      res.sendStatus(500);
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
      res.sendStatus(500);
    }
  };

  private getStockCount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userId, symbol } = req.query;
      const count = await this.OrderService.getStockCount(userId, symbol);
      res.send({ count });
    } catch (error: any) {
      console.log(error.message);
      res.sendStatus(500);
    }
  };
}
