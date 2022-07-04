import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import RegisterService from "../../resources/register/register.service";
import RegisterModel from "../register/register.model";
const rn = require("random-number");
const { v4: uuidv4 } = require('uuid');

export default class RegisterController implements Controller {
  public path = "/register";
  public router = Router();
  private RegisterService = new RegisterService();
  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}`, this.create);
    this.router.get(`${this.path}`, this.getRegisters);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { firstName, lastName, email, password, phoneNumber, address, creditCard  } = req.body;

      const register = new RegisterModel();
      register.userID = uuidv4();
      register.firstName = firstName;
      register.lastName = lastName;
      register.email = email;
      register.password = password;
      register.phoneNumber = phoneNumber;
      register.address = address;
      register.creditsAvailable = 1000;
      register.creditCard = creditCard;

      const createRegister = await this.RegisterService.create(register);

      res.sendStatus(201);
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };

  private getRegisters = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const orders = await this.RegisterService.getRegisters();
      res.send({ orders });
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };
}
