"use strict";
/**
 * Author: Dharmay Dineshchandra Sureja
 * BannerID: B00904061
 * Email: dh276903@dal.ca
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// register controller responsible for routing api calls and handeling backend logic
const express_1 = require("express");
const register_service_1 = __importDefault(require("../../resources/register/register.service"));
const register_model_1 = __importDefault(require("../register/register.model"));
const rn = require("random-number");
class RegisterController {
    constructor() {
        this.path = "/register";
        this.router = (0, express_1.Router)();
        this.RegisterService = new register_service_1.default();
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { first_name, last_name, email, password, phone, address, account, risk_appetite } = req.body;
                const register = new register_model_1.default();
                const options = {
                    min: 12345,
                    max: 20000,
                    integer: true,
                };
                register.userID = rn(options);
                register.first_name = first_name;
                register.last_name = last_name;
                register.email = email;
                register.password = password;
                register.phone = phone;
                register.address = address;
                register.credits = 1000;
                register.account = account;
                register.risk_appetite = risk_appetite;
                const checkexists = yield this.RegisterService.getRegisters(email);
                if (checkexists === null) {
                    console.log("Creating user");
                    const createRegister = yield this.RegisterService.create(register);
                    res.sendStatus(201);
                }
                else {
                    console.log("USER ALREADY EXISTS");
                    res.sendStatus(409);
                    res.send("user already exists");
                }
            }
            catch (error) {
                console.log(error.message);
                console.log("ERROR BROTHER");
                res.sendStatus(400);
            }
        });
        this.getRegisters = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.query.email;
                const register = yield this.RegisterService.getRegisters(email);
                res.send({ register });
            }
            catch (error) {
                console.log(error.message);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                const checklogin = yield this.RegisterService.login(email, password);
                console.log(checklogin);
                if (checklogin === null) {
                    res.sendStatus(404);
                }
                else {
                    res.status(200);
                    res.send(checklogin);
                }
            }
            catch (error) {
                console.log(error.message);
                res.sendStatus(409);
            }
        });
        this.resetpassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                const resetpassword = yield this.RegisterService.resetpassword(email, password);
                res.sendStatus(200);
            }
            catch (error) {
                console.log(error.message);
                res.sendStatus(409);
            }
        });
        this.sendEmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                console.log("EMAIL IS HEREEEEE ", email);
                var otp = Math.floor(1000 + Math.random() * 9000);
                console.log("OTP is =", otp);
                var nodemailer = require('nodemailer');
                const { google } = require("googleapis");
                const OAuth2 = google.auth.OAuth2;
                const oauth2Client = new OAuth2("903649748216-72r7pi5aki217mqcmjn635ok9vskimj4.apps.googleusercontent.com", // ClientID
                "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", // Client Secret
                "https://developers.google.com/oauthplayground" // Redirect URL
                );
                oauth2Client.setCredentials({
                    refresh_token: "1//04tOf2lQz1dd1CgYIARAAGAQSNwF-L9IrTj5OZ_HbeNBpE_K0uLjjiGBZJN-ZyQjxr1jAXI9uLjBuNi8_7-h64dEaU-ZbJIlbMQ4"
                });
                const accessToken = oauth2Client.getAccessToken();
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
                    html: "<b>OTP FOR DTRADE APP is </b>" + otp
                };
                smtpTransport.sendMail(mailOptions, (error, response) => {
                    error ? console.log(error) : console.log(response);
                    smtpTransport.close();
                });
                res.send({ otp });
            }
            catch (error) {
                console.log(error.message);
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}`, this.create);
        this.router.get(`${this.path}`, this.getRegisters);
        this.router.post(`${this.path}/otp`, this.sendEmail);
        this.router.post(`${this.path}/login`, this.login);
        this.router.post(`${this.path}/forgotpassword`, this.resetpassword);
    }
}
exports.default = RegisterController;
