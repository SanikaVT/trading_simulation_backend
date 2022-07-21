/**

 * Author: Dharmay Sureja

 * BannerID: B00904061

 * Email:dh276903@dal.ca

 */

// blog services responsible to handle businesslogic
import CommentsModel from "../comments/comments.model";
import Comments from "../comments/comments.interface";

export default class CommentsService {
  private comments = CommentsModel;
// add comments to a particular blog
  public async addComments(comments: Comments): Promise<Comments> {
    try {
      const create = await this.comments.create(comments);
      return create;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to create a Comment.");
    }
  }
// get comments related to a blog
  public async getComments(blogsID :any): Promise<any> {
    try {
      const comments = await this.comments.find({blogsID});
      return comments;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to get Comment.");
    }
  }

// delete a particular comment
  public async deleteBlogs(commentID:any): Promise<any> {
    try {
      
      const comm = await this.comments.findOneAndDelete({commentID:commentID});
      console.log("Success");
      return comm;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to delete Comment.");
    }
  }

}
