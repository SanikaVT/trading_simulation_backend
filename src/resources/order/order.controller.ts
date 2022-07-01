import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import OrderService from "../../resources/order/order.service";
import OrderModel from "../order/order.model";

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
      const { orderID, symbol, quantity, price, status, orderType } = req.body;
      const order = new OrderModel();
      order.orderID = orderID;
      order.symbol = symbol;
      order.quantity = quantity;
      order.price = price;
      order.timestamp = new Date();
      order.status = status;
      order.orderType = orderType;

      const createdOrder = await this.OrderService.create(order);

      res.sendStatus(201).send({ createdOrder });
    } catch (error: any) {
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
