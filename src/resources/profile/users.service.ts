import UsersModel from "./users.model";
import Users from "./users.interface";

export default class ProfileService {
  private users = UsersModel;

  public async updateProfile(users:Users): Promise<any> {
    try {
      console.log(users);
      const prof = await this.users.findOneAndUpdate({userID:users.userID}, {address:users.address,credits:users.credits, account:users.account, risk_appetite:users.risk_appetite});
      console.log("Success");
      return prof;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to update profile.");
    }
  }

  public async getProfileById(userID:any): Promise<any> {
    try {
      const getProfile = await this.users.findOne({userID:userID});
      console.log("Success");
      return getProfile;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to get profile.");
    }
  }
}
