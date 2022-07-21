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


// declare routes
  private initialiseRoutes(): void {
    this.router.post(`${this.path}`, this.create);
    this.router.get(`${this.path}`, this.getRegisters);
    this.router.post(`${this.path}/otp`, this.sendEmail);
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/forgotpassword`, this.resetpassword);
  }
// register user logic
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

// get registered users logic
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

//check login logic
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

//reset password logic
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



//email send logic
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
          "903649748216-q12n618sjkm4dt1avsouf1d5vc4104nf.apps.googleusercontent.com", // ClientID
      "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", // Client Secret
          "https://developers.google.com/oauthplayground" // Redirect URL
    );
      oauth2Client.setCredentials({
        refresh_token: "1//0461TZAF54cGbCgYIARAAGAQSNwF-L9Iryc_C1hwYTIk7aOYF32AH2X244mCg1wKAMDYHLP5zrHXEKhBmmI4i7raIe9tTXvnXRMg"
      });
      const accessToken = oauth2Client.getAccessToken()
      const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "dtradeapp.noreply@gmail.com",
          clientId: "903649748216-q12n618sjkm4dt1avsouf1d5vc4104nf.apps.googleusercontent.com",
          clientSecret: "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",
          refreshToken: "1//0461TZAF54cGbCgYIARAAGAQSNwF-L9Iryc_C1hwYTIk7aOYF32AH2X244mCg1wKAMDYHLP5zrHXEKhBmmI4i7raIe9tTXvnXRMg",
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
