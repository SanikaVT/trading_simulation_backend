/**
 * Author: Udit Gandhi
 * BannerID: B00889579
 * Email: udit.gandhi@dal.ca
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
      const {
        userId,
        symbol,
        quantity,
        price,
        orderType,
        currentMargin,
        mail,
      } = req.body;
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
          } else {
            updatedMargin = currentMargin - orderAmount;
          }
        } else {
          updatedMargin = currentMargin + orderAmount;
        }
        const user = await profileService.updateUserCredits(
          userId,
          updatedMargin
        );
        sendApproval(mail);
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

function sendApproval(mail: any) {
  try {
    const email = mail;
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
      to: email,
      subject: "Order Status Updated",
      generateTextFromHTML: true,
      html:
        "<b> Congratulatios, You  have successfully made a purchase for an order </b> /n" +
        "<b> By <br/> Team DTrade </b>",
    };
    smtpTransport.sendMail(mailOptions, (error: any, response: any) => {
      error ? console.log(error) : console.log(response);
      smtpTransport.close();
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
