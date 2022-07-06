"use strict";
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
const express_1 = require("express");
const users_service_1 = __importDefault(require("./users.service"));
const users_model_1 = __importDefault(require("./users.model"));
class ProfileController {
    constructor() {
        this.path = "/users";
        this.router = (0, express_1.Router)();
        this.ProfileService = new users_service_1.default();
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userID, email, phone, account, risk_appetite, address, credits } = req.body;
                var users;
                users = new users_model_1.default();
                users.userID = userID;
                users.email = email;
                users.phone = phone;
                users.account = account;
                users.risk_appetite = risk_appetite;
                users.address = address;
                users.credits = credits;
                const updateProfile = yield this.ProfileService.updateProfile(users);
                res.sendStatus(201);
            }
            catch (error) {
                console.log(error.message);
                //next(new HttpException(400, error.message));
            }
        });
        this.getProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = req.body.userID;
                const prof = yield this.ProfileService.getProfileById(userID);
                res.send({ prof });
            }
            catch (error) {
                console.log(error.message);
                //next(new HttpException(400, error.message));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}`, this.update);
        this.router.get(`${this.path}`, this.getProfile);
    }
}
exports.default = ProfileController;
