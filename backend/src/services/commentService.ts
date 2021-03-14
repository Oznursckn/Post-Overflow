import { ApiError } from "../config/ApiError";
import CommentDto from "../dto/commentDto";
import Comment from "../models/Comment";
import { StatusCodes } from "http-status-codes";
import postService from "./postService";
import userService from "./userService";

class CommentService {
  async save(commentDto: CommentDto) {
    await postService.getById(commentDto.postId);
    await userService.getById(commentDto.userId);

    await Comment.create({
      ...commentDto,
      dislike: 0,
      like: 0,
      dateCreated: new Date(),
    }).save();
  }

  async getById(id: string) {
    const comment = await Comment.findOne(id);
    if (!comment) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `${id} ID ye sahip yorum bulunamadı`
      );
    }
    return comment;
  }

  async delete(id: string) {
    const comment = await this.getById(id);
    await Comment.delete(comment);
  }

  async getByPostId(postId: string) {
    const post = await postService.getById(postId);
    return await Comment.find({ relations: ["user"], where: { post } });
  }

  async like(id: string) {
    const comment = await this.getById(id);
    const like = comment.like + 1;
    await Comment.update(comment, { like });
    return { like };
  }

  async dislike(id: string) {
    const comment = await this.getById(id);
    const dislike = comment.dislike + 1;
    await Comment.update(comment, { dislike });
    return { dislike };
  }
}

export default new CommentService();
