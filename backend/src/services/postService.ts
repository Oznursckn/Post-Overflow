import { StatusCodes } from "http-status-codes";
import { ApiError } from "../config/ApiError";
import PostDto from "../dto/postDto";
import Post from "../models/Post";
import userService from "./userService";

class PostService {
  async save(postDto: PostDto) {
    await userService.getById(postDto.userId);
    await Post.create({
      ...postDto,
      like: 0,
      dateCreated: new Date(),
    }).save();
  }

  async getAll() {
    return Post.find({ relations: ["user"] });
  }

  async getById(id: string) {
    const post = await Post.findOne(id, { relations: ["user"] });
    if (!post) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `${id} Id ye sahip paylaşım bulunamadı`
      );
    }
    return post;
  }

  async delete(id: string) {
    const post = await this.getById(id);
    await post.remove();
  }

  async getPostsByUserId(userId: string) {
    const user = await userService.getById(userId);
    return await Post.find({ where: { user: user } });
  }
}

export default new PostService();
