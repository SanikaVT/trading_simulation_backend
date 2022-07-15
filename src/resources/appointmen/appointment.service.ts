import AppointmentModel from "./appointment.model"
import Appointment from "./appointment.interface"

export default class AppointmentService {
    private appointment = AppointmentModel;

    public async create(appointment: Appointment): Promise<Appointment> {
        try {
            const createdAppointment = await this.appointment.create(appointment);
            return createdAppointment;
        } catch (err) {
            throw new Error("Unable to create appointment.");
        }
    }

    public async getAppointment(): Promise<Appointment[]> {
        try {
            const appointments = await this.appointment.find();
            return appointments;
        } catch (err) {
            throw new Error("Unable to get appointment.");
        }
    }
    public async delete(id: number): Promise<void> {
        try {
            const appointment = await this.appointment.deleteOne({ id });
        } catch (err) {
            throw new Error("Unable to delete appointment.");
        }
    }

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
