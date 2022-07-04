import RegisterModel from "../register/register.model";
import Register from "../register/register.interface";

export default class RegisterService {
  private register = RegisterModel;

  public async create(register: Register): Promise<Register> {
    try {
      const createdRegisters = await this.register.create(register);
      return createdRegisters;
    } catch (err) {
      throw new Error("Unable to Register User.");
    }
  }

  public async getRegisters(): Promise<Register[]> {
    try {
      const registers = await this.register.find();
      return registers;
    } catch (err) {
      throw new Error("Unable to get register.");
    }
  }
}
