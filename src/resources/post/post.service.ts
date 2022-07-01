import PostModel from "../../resources/post/post.model";
import Post from "../../resources/post/post.interface";

export default class PostService {
  private post = PostModel;

  public async create(title: string, body: string): Promise<Post> {
    try {
      const post = await this.post.create({ title: title, body: body });
      return post;
    } catch (err) {
      throw new Error("Unable to create post");
    }
  }
}
