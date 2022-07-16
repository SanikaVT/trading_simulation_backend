import UsersModel from "./users.model";
import Users from "./users.interface";

/**
 * Author: Sanika Tamhankar
 * BannerID: B00909848
 * Email: sn295037@dal.ca
 */

//Contains main logic which deals with MongoDB CRUD operations using Mongoose.

export default class ProfileService {
  private users = UsersModel;
  //update profile using findOneAndUpdate method of Mongoose
  public async updateProfile(users: Users): Promise<any> {
    try {
      const prof = await this.users.findOneAndUpdate(
        { userID: users.userID },
        {
          address: users.address,
          credits: users.credits,
          account: users.account,
          risk_appetite: users.risk_appetite,
        }
      );
      return prof;
    } catch (err: any) {
      throw new Error("Unable to update profile.");
    }
  }
  //get profile using findOne method of Mongoose
  public async getProfileById(userID: any): Promise<any> {
    try {
      const getProfile = await this.users.findOne({ userID: userID });
      console.log("Success");
      return getProfile;
    } catch (err: any) {
      console.log(err.message);
      throw new Error("Unable to get profile.");
    }
  }

  /**
   * Author: Udit Gandhi
   * BannerID: B00889579
   * Email: udit.gandhi@dal.ca
   *
   * Update user credits using findOneAndUpdate method of Mongoose
   */
  public async updateUserCredits(
    userID: string,
    credits: number
  ): Promise<any> {
    try {
      const user = await this.users.findOneAndUpdate(
        { userID: userID },
        {
          credits: credits,
        }
      );
      return user;
    } catch (err: any) {
      console.log(err.message);
      throw new Error("Unable to update user credits.");
    }
  }

  /**
   * Author: Udit Gandhi
   * BannerID: B00889579
   * Email: udit.gandhi@dal.ca
   *
   * Get user credits using findOne method of Mongoose
   */
  public async getUserCredits(userID: any): Promise<any> {
    try {
      const user = await this.users.findOne({ userID: userID });
      return user?.credits;
    } catch (err: any) {
      console.log(err.message);
      throw new Error("Unable to update user credits.");
    }
  }
}
