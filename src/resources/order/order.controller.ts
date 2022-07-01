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
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { orderID, symbol, quantity, price, timestamp, status, orderType } =
        req.body;
      const order = new OrderModel();
      order.orderID = orderID;
      order.symbol = symbol;
      order.quantity = quantity;
      order.price = price;
      order.timestamp = timestamp;
      order.status = status;
      order.orderType = orderType;

      const createdOrder = await this.OrderService.create(order);

      res.send(201).json({ createdOrder });
    } catch (error: any) {
      //next(new HttpException(400, error.message));
    }
  };
}
