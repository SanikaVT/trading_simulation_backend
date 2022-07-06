import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import ProfileService from "../profile/profile.service";
import ProfileModel from "../profile/profile.model";
import profileInterface from "./profile.interface";

export default class ProfileController implements Controller {
  public path = "/profile";
  public router = Router();
  private ProfileService = new ProfileService();
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
      var profile: profileInterface;
      profile = new ProfileModel();
      profile.userID = userID;
      profile.email = email;
      profile.phone = phone;
      profile.account = account;
      profile.risk_appetite =risk_appetite;
      profile.address = address;
      profile.credits = credits;

      const updateProfile = await this.ProfileService.updateProfile(profile);

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
      const userID=req.body;
      const prof = await this.ProfileService.getProfileById(userID);
      res.send({ prof });
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };
}
