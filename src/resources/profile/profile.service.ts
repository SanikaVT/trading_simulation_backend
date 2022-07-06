import ProfileModel from "../profile/profile.model";
import Profile from "../profile/profile.interface";

export default class ProfileService {
  private profile = ProfileModel;

  public async updateProfile(profile: Profile): Promise<any> {
    try {
      const prof = await this.profile.findByIdAndUpdate(profile.userID, profile);
      return prof;
    } catch (err) {
      throw new Error("Unable to update profile.");
    }
  }

  public async getProfileById(userID:Number): Promise<any> {
    try {
      const getProfile = await this.profile.findById(userID);
      return getProfile;
    } catch (err) {
      throw new Error("Unable to get profile.");
    }
  }
}
