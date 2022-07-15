// author: qiwei sun
// date: 2022/07/15
// description: this file defined all the business logic handled by the appointment
import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import AppointmentService from "./appointment.service"
import AppointmentModel from "./appointment.model";
const rn = require("random-number");
export default class AppointmentController implements Controller {
    // delcate api router and path
    public path = "/appointment";
    public router = Router();
    private AppointmentService = new AppointmentService();
    constructor() {
        this.initialiseRoutes();
    }
    // initialize all the api call
    private initialiseRoutes(): void {
        this.router.post(`${this.path}`, this.create);
        this.router.get(`${this.path}`, this.getAppointment);
        this.router.delete(`${this.path}/:id`,this.cancelAppointment)
        this.router.get(`${this.path}/:userID`, this.getAppointmentByUserID)
    }
    // create a appointment
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email,
            lastName,
            firstName,
            age,
            address,
            date,userID} = req.body;
            const options = {
                min: 12345,
                max: 20000,
                integer: true,
            };
            
            const appointment = new AppointmentModel();
            appointment.id = rn(options);
            appointment.email = email;
            appointment.lastName = lastName;
            appointment.age = age;
            appointment.address = address;
            appointment.firstName = firstName;
            appointment.date = date;
            appointment.userID = userID;
            

            const createdappointment = await this.AppointmentService.create(appointment);

            res.sendStatus(201);
        } catch (error: any) {
            console.log(error.message);
            //next(new HttpException(400, error.message));
        }
    };
    
    //get all appointment
    private getAppointment = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const appointment = await this.AppointmentService.getAppointment();
            res.send({ appointment });
        } catch (error: any) {
            console.log(error.message);
            //next(new HttpException(400, error.message));
        }
    };

    //delete the appointment
    private cancelAppointment = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const appointment = await this.AppointmentService.delete(parseInt(req.params.id));
            res.send( "deleted");
        } catch (error: any) {
            console.log(error.message);
            res.send(error);
            //next(new HttpException(400, error.message));
        }
    };

   //filter appointmens by userID, only show appointments that crated by the user 
    private getAppointmentByUserID = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const appointment = await this.AppointmentService.getAppointmentByUserID(parseInt(req.params.userID));
            res.send({appointment});
        } catch (error: any) {
            res.send(error);
            //next(new HttpException(400, error.message));
        }
    };



}
