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
      const { userID, account, risk_appetite, address, credits } = req.body;
      var users: usersInterface;
      users = new UsersModel();
      users.userID = userID;
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
      const uID=req.query.userID;
      console.log(req.query.userID);
      const prof = await this.ProfileService.getProfileById(uID);
      res.send({ prof });
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };
}
