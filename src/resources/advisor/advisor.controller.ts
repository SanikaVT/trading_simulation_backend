import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import AdvisorService from "./advisor.service"
import AdvisorModel from "./advisor.model";
const rn = require("random-number");


export default class AdvisorController implements Controller {
    public path = "/advisor";
    public router = Router();
    private AdvisorService = new AdvisorService();
    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(`${this.path}`, this.create);
        this.router.get(`${this.path}`, this.getAdvisor);
        this.router.get(`${this.path}/:email`,this.getOne)
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email,
                lastName,
                firstName,
                phoneNumber,
                age,
                address,
                image,
                title } = req.body;

            const advisor = new AdvisorModel();
            const options = {
                min: 12345,
                max: 20000,
                integer: true,
            };
            advisor.id = rn(options);
            advisor.email = email;
            advisor.lastName = lastName;
            advisor.firstName = firstName
            advisor.phoneNumber = phoneNumber;
            advisor.age = age;
            advisor.address = address;
            advisor.image = image;
            advisor.title = title;

            const createdAdvisor = await this.AdvisorService.create(advisor);
            console.log(req.body)

            res.sendStatus(201);
        } catch (error: any) {
            console.log(error.message);
            //next(new HttpException(400, error.message));
        }
    };

    private getAdvisor = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const advisor = await this.AdvisorService.getAdvisor();
            res.send({ advisor });
        } catch (error: any) {
            console.log(error.message);
            //next(new HttpException(400, error.message));
        }
    };

    private getOne = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const advisor = await this.AdvisorService.getOne(req.params.email);
            res.send({ advisor });
        } catch (error: any) {
            console.log(error.message);
            //next(new HttpException(400, error.message));
        }
    }
}
