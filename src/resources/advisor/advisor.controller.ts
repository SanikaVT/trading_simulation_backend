/* author: qiwei sun
date: 2022/07/15
description:This file handle the business logic for advisor. 
it provided 3 api call post /api/advisor get /api/advisor and get /api/advosr/:id*/
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
        // create a advisor
        this.router.post(`${this.path}`, this.create);
        // get all the advisor
        this.router.get(`${this.path}`, this.getAdvisor);
        // get advisor by id or get by name depende on request parameter
        this.router.get(`${this.path}/:id`,this.getOne);
    }

    // method to create advisor, read from request body and store adviosr object in mongodb
    // @params: req.body
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
            advisor.fullName = firstName.concat("-").concat(lastName)

            const createdAdvisor = await this.AdvisorService.create(advisor);
            console.log(req.body)

            res.sendStatus(201);
        } catch (error: any) {
            console.log(error.message);
            //next(new HttpException(400, error.message));
        }
    };

    // method to get all advisor in database
    // @params: null
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

    // method to get a advisor by it id or it's name in database
    // @params: null
    private getOne = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        if(isNaN(parseInt(req.params.id))){
            try {
                const advisor = await this.AdvisorService.getOneByName(req.params.id);
                console.log(req.params.id)
                res.send({ advisor });
            } catch (error: any) {
                console.log(error.message);
                //next(new HttpException(400, error.message));
            }
        }else{
            try {
                const advisor = await this.AdvisorService.getOne(parseInt(req.params.id));
                res.send({ advisor });
            } catch (error: any) {
                console.log(error.message);
                //next(new HttpException(400, error.message));
            }
        }
      
    }

    


}
