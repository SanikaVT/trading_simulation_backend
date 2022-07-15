import CommentModel from "../forum/comment.model";
import Comment from "../forum/comment.interface";

/**
 * Author: Sanika Tamhankar
 * BannerID: B00909848
 * Email: sn295037@dal.ca
 */
export default class CommentService {
  private comment = CommentModel;

  public async addComment(comment: Comment): Promise<Comment> {
    try {
      const createdComment = await this.comment.create(comment);
      return createdComment;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to create a comment.");
    }
  }

  public async getCommentsList(symbol:any): Promise<any> {
    try {
      const comments = await this.comment.find({symbol:symbol});
      return comments;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to get comments.");
    }
  }

  public async updateComment(comment:Comment): Promise<any> {
    try {
      console.log(comment);
      const comm = await this.comment.findOneAndUpdate({symbol:comment.symbol,commentID:comment.commentID}, {comment:comment.comment,creation_date:comment.creation_date});
      console.log("Success");
      return comm;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to update comment.");
    }
  }

  public async deleteComment(symbol:any,commentID:any): Promise<any> {
    try {
      console.log(commentID);
      const comm = await this.comment.findOneAndDelete({symbol:symbol,commentID:commentID});
      console.log("Success");
      return comm;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to delete comment.");
    }
  }

}
