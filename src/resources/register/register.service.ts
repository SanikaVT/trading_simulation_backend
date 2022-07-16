/**
 * Author: Dharmay Dineshchandra Sureja
 * BannerID: B00904061
 * Email: dh276903@dal.ca
 */

// register services responsible to handle businesslogic


import RegisterModel from "../register/register.model";
import Register from "../register/register.interface";

export default class RegisterService {
  private register = RegisterModel;

//register user service
  public async create(register: Register): Promise<Register> {
    try {
      const createdRegisters = await this.register.create(register);
      return createdRegisters;
    } catch (err) {
      throw new Error("Unable to Register User.");
    }
  }

//get registered user service
  public async getRegisters(email: any): Promise<any> {
    try {
      const registers = await this.register.findOne({ email: email });
      return registers;
    } catch (err) {
      throw new Error("Unable to get register.");
    }
  }

  //login service
  public async login(email: any, password: any): Promise<any> {
    try {
      const registers = await this.register.findOne({
        email: email,
        password: password,
      });
      return registers;
    } catch (err) {
      throw new Error("Unable to get register.");
    }
  }

//reset password service
  public async resetpassword(email: any, password: any): Promise<any> {
    try {
      const prof = await this.register.findOneAndUpdate(
        { email: email },
        { password: password }
      );
      return prof;
    } catch (err: any) {
      console.log(err.message);
      throw new Error("Unable to update profile.");
    }
  }
}
