import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import HoldingsService from "../../resources/holdings/holdings.service";
import HoldingsModel from "../holdings/holdings.model";
const rn = require("random-number");

export default class HoldingsController implements Controller {
  public path = "/holdings";
  public router = Router();
  private HoldingsService = new HoldingsService();
  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}`, this.create);
    this.router.get(`${this.path}`, this.getHoldings);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { symbol, quantity, price } = req.body;
      const options = {
        min: 12345,
        max: 20000,
        integer: true,
      };
      const holdings = new HoldingsModel();
      holdings.holdingsID = rn(options);
      holdings.symbol = symbol;
      holdings.quantity = quantity;
      holdings.price = price;
      holdings.timestamp = new Date();


      const createdHoldings = await this.HoldingsService.create(holdings);

      res.sendStatus(201);
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };

  private getHoldings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const holdings = await this.HoldingsService.getHoldings();
      res.send({ holdings: holdings });
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };
}
