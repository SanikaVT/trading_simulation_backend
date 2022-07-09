import CommentModel from "../forum/comment.model";
import Comment from "../forum/comment.interface";

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

  public async getCommentsList(): Promise<Comment[]> {
    try {
      const comments = await this.comment.find();
      return comments;
    } catch (err) {
      throw new Error("Unable to get comments.");
    }
  }

  public async updateComment(comment:Comment): Promise<any> {
    try {
      console.log(comment);
      const comm = await this.comment.findOneAndUpdate({analyticsID:comment.analyticsID,commentID:comment.commentID}, {comment:comment.comment,creation_date:comment.creation_date});
      console.log("Success");
      return comm;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("SUnable to update comment.");
    }
  }

  public async deleteComment(analyticsID:any,commentID:any): Promise<any> {
    try {
      console.log(commentID);
      const comm = await this.comment.findOneAndDelete({analyticsID:analyticsID,commentID:commentID});
      console.log("Success");
      return comm;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to delete comment.");
    }
  }

}
