/**

 * Author: Dharmay Sureja

 * BannerID: B00904061

 * Email:dh276903@dal.ca

 */
import CommentsModel from "../comments/comments.model";
import Comments from "../comments/comments.interface";

export default class CommentsService {
  private comments = CommentsModel;

  public async addComments(comments: Comments): Promise<Comments> {
    try {
      const create = await this.comments.create(comments);
      return create;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to create a Comment.");
    }
  }

  public async getComments(blogsID :any): Promise<any> {
    try {
      const comments = await this.comments.find({blogsID});
      return comments;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to get Comment.");
    }
  }


  public async deleteBlogs(commentID:any): Promise<any> {
    try {
      // console.log(commentsID);
      const comm = await this.comments.findOneAndDelete({commentID:commentID});
      console.log("Success");
      return comm;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to delete Comment.");
    }
  }

}
