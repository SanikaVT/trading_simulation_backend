import UsersModel from "./users.model";
import Users from "./users.interface";

export default class ProfileService {
  private users = UsersModel;

  public async updateProfile(users: Users): Promise<any> {
    try {
      const prof = await this.users.findOneAndUpdate({userID:users.userID}, {users},{new:false});
      console.log("Success");
      return prof;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to update profile.");
    }
  }

  public async getProfileById(userID:Number): Promise<any> {
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
