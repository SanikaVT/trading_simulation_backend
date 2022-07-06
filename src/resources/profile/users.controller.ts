import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import UsersService from "./users.service";
import UsersModel from "./users.model";
import usersInterface from "./users.interface";

export default class ProfileController implements Controller {
  public path = "/users";
  public router = Router();
  private ProfileService = new UsersService();
  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}`, this.update);
    this.router.get(`${this.path}`, this.getProfile);
  }

  private update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userID, email, phone, account, risk_appetite, address, credits } = req.body;
      var users: usersInterface;
      users = new UsersModel();
      users.userID = userID;
      users.email = email;
      users.phone = phone;
      users.account = account;
      users.risk_appetite =risk_appetite;
      users.address = address;
      users.credits = credits;

      const updateProfile = await this.ProfileService.updateProfile(users);

      res.sendStatus(201);
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };

  private getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userID=req.body.userID;
      const prof = await this.ProfileService.getProfileById(userID);
      res.send({ prof });
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };
}
