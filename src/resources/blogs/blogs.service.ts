/**

 * Author: Dharmay Sureja

 * BannerID: B00904061

 * Email:dh276903@dal.ca

 */
import BlogsModel from "../blogs/blogs.model";
import Blogs from "../blogs/blogs.interface";

export default class BlogsService {
  private blogs = BlogsModel;

  public async addBlogs(blogs: Blogs): Promise<Blogs> {
    try {
      const create = await this.blogs.create(blogs);
      return create;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to create a Blog.");
    }
  }

  public async getBlogsList(): Promise<any> {
    try {
      const blogs = await this.blogs.find();
      return blogs;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to get Blog.");
    }
  }

  public async getDetails(blogsID: any): Promise<any> {
    try {
      const details = await this.blogs.findOne({ blogsID: blogsID });
      // console.log(details);
      return details;
    } catch (err) {
      throw new Error("Unable to get blog details.");
    }
  }


  public async updateBlogs(blogs:Blogs): Promise<any> {
    try {
      console.log(blogs);
      const comm = await this.blogs.findOneAndUpdate({userID:blogs.userID,blogsID:blogs.blogsID}, {title:blogs.title,description:blogs.description,content:blogs.content});
      console.log("Success");
      return comm;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to update blog.");
    }
  }


  public async addLike(blogsID:any, likes:any): Promise<any> {
    try {
      // console.log(blogs);
      const comm = await this.blogs.findOneAndUpdate({blogsID:blogsID}, {likes:likes});
      console.log("Success");
      return comm;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to like blog.");
    }
  }


  public async deleteBlogs(blogsID:any): Promise<any> {
    try {
      console.log(blogsID);
      const comm = await this.blogs.findOneAndDelete({blogsID:blogsID});
      console.log("Success");
      return comm;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to delete Blog.");
    }
  }

}
