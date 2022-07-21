import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import UsersService from "./users.service";
import UsersModel from "./users.model";
import usersInterface from "./users.interface";

/**
 * Author: Sanika Tamhankar
 * BannerID: B00909848
 * Email: sn295037@dal.ca
 */
export default class ProfileController implements Controller {
  public path = "/users";
  public router = Router();
  private ProfileService = new UsersService();
  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    console.log("path", `${this.path}`);

    this.router.post(`${this.path}`, this.update);
    this.router.get(`${this.path}`, this.getProfile);
    this.router.post(`${this.path}/sendThisEmail`, this.sendMail);
    this.router.get(`${this.path}/credits`, this.getUserCredits);
  }

  //takas user information that needs to be updated and passes it to service
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
      users.risk_appetite = risk_appetite;
      users.address = address;
      users.credits = credits;

      const updateProfile = await this.ProfileService.updateProfile(users);

      res.sendStatus(201);
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };
  //takes userID as a query param, passes it to service and return profile information
  private getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const uID = req.query.userID;
      console.log(req.query.userID);
      const prof = await this.ProfileService.getProfileById(uID);
      res.send({ prof });
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };

  //Get user credits by userID from service
  private getUserCredits = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.query.userID;
      const credits = await this.ProfileService.getUserCredits(userId);
      res.send({ credits });
    } catch (error: any) {
      console.log(error.message);
      res.sendStatus(500);
    }
  };

  //to send mail once credits added to user account
  private sendMail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      console.log(req.body);

      const email = req.body.mail;
      const newCredit = req.body.credits;
      console.log("EMAIL IS HEREEEEE ", email);

      var nodemailer = require("nodemailer");
      const { google } = require("googleapis");
      const OAuth2 = google.auth.OAuth2;
      const oauth2Client = new OAuth2(
        "903649748216-q12n618sjkm4dt1avsouf1d5vc4104nf.apps.googleusercontent.com", // ClientID
        "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", // Client Secret
        "https://developers.google.com/oauthplayground" // Redirect URL
      );
      oauth2Client.setCredentials({
        refresh_token:
          "1//0461TZAF54cGbCgYIARAAGAQSNwF-L9Iryc_C1hwYTIk7aOYF32AH2X244mCg1wKAMDYHLP5zrHXEKhBmmI4i7raIe9tTXvnXRMg",
      });
      const accessToken = oauth2Client.getAccessToken();
      const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "dtradeapp.noreply@gmail.com",
          clientId:
            "903649748216-q12n618sjkm4dt1avsouf1d5vc4104nf.apps.googleusercontent.com",
          clientSecret: "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",
          refreshToken:
            "1//0461TZAF54cGbCgYIARAAGAQSNwF-L9Iryc_C1hwYTIk7aOYF32AH2X244mCg1wKAMDYHLP5zrHXEKhBmmI4i7raIe9tTXvnXRMg",
          accessToken: accessToken,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      const mailOptions = {
        from: "dtradeapp.noreply@gmail.com",
        to: "dashiiit2k17@gmail.com",
        subject: "Credits Updated",
        generateTextFromHTML: true,
        html:
          "<b> Congratulatios, Your requested credit successfully deposited & your new credits are " +
          "Go to User Profile page to see new credits" +
          "</b> /n" +
          "<b> By <br/> Team DTrade </b>",
      };
      smtpTransport.sendMail(mailOptions, (error: any, response: any) => {
        error ? console.log(error) : console.log(response);
        smtpTransport.close();
      });
    } catch (error: any) {
      console.log("============ ", error.message);
    }
  };
}
