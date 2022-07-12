import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import RegisterService from "../../resources/register/register.service";
import RegisterModel from "../register/register.model";
const rn = require("random-number");
// const { v4: uuidv4 } = require('uuid');
import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import * as firebase from 'firebase';
// import 'firebase/firestore';
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
      const { first_name, last_name, email, password, phone, address, creditCard, riskappetite  } = req.body;

      const register = new RegisterModel();
      // register.userID = "uuidv4()";
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
      register.creditCard = creditCard;
      register.riskappetite = riskappetite;
      const checkexists = await  this.RegisterService.getRegisters(email);
     // console.log(checkexists);
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


// console.log("ERROR BROTHER");

    } catch (error: any) {
      console.log(error.message);
      console.log("ERROR BROTHER");
      res.sendStatus(400);
      //next(new HttpException(400, error.message));
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
      //next(new HttpException(400, error.message));
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

      if(checklogin === null){
        res.sendStatus(404);
      }
      else{
        res.sendStatus(200);
      }
      // res.send({ register });


    } catch (error: any) {
      console.log(error.message);
      res.sendStatus(409);
      //next(new HttpException(400, error.message));
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
      // res.send({ register });

    } catch (error: any) {
      console.log(error.message);
      res.sendStatus(409);
      //next(new HttpException(400, error.message));
    }
  };




  private sendEmail = async (
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<Response | void> => {
    try {
    //   const firebaseConfig = {
    //     apiKey: "AIzaSyBpxppQwhUYdfzsjNdpr5V32cAHWK8lLM0",
    //     authDomain: "dtrade-a7fcd.firebaseapp.com",
    //     projectId: "dtrade-a7fcd",
    //     storageBucket: "dtrade-a7fcd.appspot.com",
    //     messagingSenderId: "166579257653",
    //     appId: "1:166579257653:web:1bf8c358672a3c5f744c7c"
    //   };
    //   const app = initializeApp(firebaseConfig);
    //  // const db = getFirestore(app);
    // var db = firebase.firestore(app);
    //   const docRef = db.collection('users').doc('alovelace');
    //
    //   await docRef.set({
    //     first: 'Ada',
    //     last: 'Lovelace',
    //     born: 1815
    //   });


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

      // var transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     type: "OAuth2",
      //     user: 'dtradeapp.noreply@gmail.com',
      //     clientId: "903649748216-nip97jq7tbiins9a9onte13lmm18c3pp.apps.googleusercontent.com",
      //     clientSecret: "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",
      //     refreshToken: "1//04-pDfpXPchuMCgYIARAAGAQSNwF-L9IrFSyGSMbDxXA16uCR3LKjBu76MBwBDLnFpBFHLSR5cTM7tT6XSXf9sjJL3fZ9QZxI64c"
      //     // pass: 'DTradeDal'
      //   }
      // });
      //
      // var mailOptions = {
      //   from: 'dtradeapp.noreply@gmail.com',
      //   to: email,
      //   subject: 'Sending Email using Node.js',
      //   text: 'That was easy!'
      // };
      //
      // transporter.sendMail(mailOptions, function(error: any, info: { response: string; }){
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //   }
      // });

      // const register = await this.RegisterService.getRegisters(email);
      // res.send({ register });
      res.send({otp});
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };
}
