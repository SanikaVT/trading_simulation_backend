// author: qiwei sun
// date: 2022/07/15
// description: This file list all the back end services provided by the appointment
import AppointmentModel from "./appointment.model"
import Appointment from "./appointment.interface"
export default class AppointmentService {
    private appointment = AppointmentModel;
    // create appintments with moogoser model.create.
    public async create(appointment: Appointment): Promise<Appointment> {
        try {
            const createdAppointment = await this.appointment.create(appointment);
            return createdAppointment;
        } catch (err) {
            throw new Error("Unable to create appointment.");
        }
    }
    //get all appointments 
    public async getAppointment(): Promise<Appointment[]> {
        try {
            const appointments = await this.appointment.find();
            return appointments;
        } catch (err) {
            throw new Error("Unable to get appointment.");
        }
    }
    //delete an appointment by it's id
    public async delete(id: number): Promise<void> {
        try {
            const appointment = await this.appointment.deleteOne({ id });
        } catch (err) {
            throw new Error("Unable to delete appointment.");
        }
    }
    //get appointments that created by the user
    public async getAppointmentByUserID(userID: number): Promise<Appointment[]> {
        try {
            console.log(userID)
            const appointment = await this.appointment.find({ userID});
            return appointment
        } catch (err) { 
            console.log(err)
            throw new Error("Unable to  get appointment.");
        }
    }
}
