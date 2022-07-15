/**
 * Author: Dharmay Dineshchandra Sureja
 * BannerID: B00904061
 * Email: dh276903@dal.ca
 */

// register controller responsible for routing api calls and handeling backend logic

import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import RegisterService from "../../resources/register/register.service";
import RegisterModel from "../register/register.model";
const rn = require("random-number");

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
    this.router.post(`${this.path}/otp`, this.sendEmail);
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/forgotpassword`, this.resetpassword);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { first_name, last_name, email, password, phone, address, account, risk_appetite  } = req.body;

      const register = new RegisterModel();
      
      const options = {
        min: 12345,
        max: 20000,
        integer: true,
      };
      register.userID =  rn(options);
      register.first_name = first_name;
      register.last_name = last_name;
      register.email = email;
      register.password = password;
      register.phone = phone;
      register.address = address;
      register.credits = 1000;
      register.account = account;
      register.risk_appetite = risk_appetite;
      const checkexists = await  this.RegisterService.getRegisters(email);
    
      if (checkexists === null){
        console.log("Creating user");
        const createRegister = await this.RegisterService.create(register);
        res.sendStatus(201);
      }
      else{
        console.log("USER ALREADY EXISTS");
        res.sendStatus(409);
        res.send("user already exists");
      }



    } catch (error: any) {
      console.log(error.message);
      console.log("ERROR BROTHER");
      res.sendStatus(400);
      
    }
  };

  private getRegisters = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const email=req.query.email;
      const register = await this.RegisterService.getRegisters(email);
      res.send({ register });
    } catch (error: any) {
      console.log(error.message);
     
    }
  };

  private login = async (
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<Response | void> => {
    try {
      const email=req.body.email;
      const password=req.body.password;
      const checklogin = await this.RegisterService.login(email,password);
    console.log(checklogin);
      if(checklogin === null){
        res.sendStatus(404);
      }
      else{
        res.status(200);
        res.send(checklogin);
        
      }
     


    } catch (error: any) {
      console.log(error.message);
      res.sendStatus(409);
      
    }
  };

  private resetpassword = async (
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<Response | void> => {
    try {
      const email=req.body.email;
      const password=req.body.password;
      const resetpassword = await this.RegisterService.resetpassword(email,password);
      res.sendStatus(200);
     

    } catch (error: any) {
      console.log(error.message);
      res.sendStatus(409);
     
    }
  };




  private sendEmail = async (
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<Response | void> => {
    try {
    

      const email=req.body.email;
      console.log("EMAIL IS HEREEEEE ",email);
      var otp = Math.floor(1000 + Math.random() * 9000);
      console.log("OTP is =",otp);

      var nodemailer = require('nodemailer');
      const { google } = require("googleapis");
      const OAuth2 = google.auth.OAuth2;
      const oauth2Client = new OAuth2(
          "903649748216-72r7pi5aki217mqcmjn635ok9vskimj4.apps.googleusercontent.com", // ClientID
      "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", // Client Secret
          "https://developers.google.com/oauthplayground" // Redirect URL
    );
      oauth2Client.setCredentials({
        refresh_token: "1//04tOf2lQz1dd1CgYIARAAGAQSNwF-L9IrTj5OZ_HbeNBpE_K0uLjjiGBZJN-ZyQjxr1jAXI9uLjBuNi8_7-h64dEaU-ZbJIlbMQ4"
      });
      const accessToken = oauth2Client.getAccessToken()
      const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "dtradeapp.noreply@gmail.com",
          clientId: "903649748216-72r7pi5aki217mqcmjn635ok9vskimj4.apps.googleusercontent.com",
          clientSecret: "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",
          refreshToken: "1//04tOf2lQz1dd1CgYIARAAGAQSNwF-L9IrTj5OZ_HbeNBpE_K0uLjjiGBZJN-ZyQjxr1jAXI9uLjBuNi8_7-h64dEaU-ZbJIlbMQ4",
          accessToken: accessToken
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      const mailOptions = {
        from: "dtradeapp.noreply@gmail.com",
        to: email,
        subject: "DTrade Application OTP",
        generateTextFromHTML: true,
        html: "<b>OTP FOR DTRADE APP is </b>"+otp
      };
      smtpTransport.sendMail(mailOptions, (error: any, response: any) => {
        error ? console.log(error) : console.log(response);
        smtpTransport.close();
      });

      res.send({otp});
    } catch (error: any) {
      console.log(error.message);
      
    }
  };
}
