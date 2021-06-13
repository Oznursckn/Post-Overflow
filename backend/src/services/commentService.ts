import { ApiError } from "../config/ApiError";
import { CommentDto } from "../dto/commentDto";
import Comment from "../models/Comment";
import { StatusCodes } from "http-status-codes";
import postService from "./postService";
import userService from "./userService";
import User from "../models/User";

class CommentService {
  async save(commentDto: CommentDto) {
    await postService.getById(commentDto.postId);
    await userService.getById(commentDto.userId);

    await Comment.create({
      ...commentDto,
      likes: 0,
      dislikes: 0,
      dateCreated: new Date(),
    }).save();
  }

  async getById(id: string) {
    const comment = await Comment.findOne(id, { relations: ["user"] });
    if (!comment) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        ` Could not find the comment for ID: ${id}`
      );
    }
    return comment;
  }

  async delete(id: string) {
    const comment = await this.getById(id);
    await Comment.delete(comment.id);
  }

  async getByPostId(postId: string) {
    const post = await postService.getById(postId);
    return await Comment.find({
      relations: ["user"],
      where: { post },
      order: { dateCreated: "DESC" },
    });
  }

  async getLikedCommentsByUserId(id: string) {
    return (await userService.getUserWithLikedAndDislikedComments(id))
      .likedComments;
  }

  async getDislikedCommentsByUserId(id: string) {
    return (await userService.getUserWithLikedAndDislikedComments(id))
      .dislikedComments;
  }

  async like(commentId: string, userId: string) {
    const comment = await this.getById(commentId);
    const user = await userService.getUserWithLikedAndDislikedComments(userId);

    const isLiked = user.likedComments.find(
      (likedComment) => likedComment.id === commentId
    );

    if (!isLiked) {
      const isDisliked = user.dislikedComments.find(
        (dislikedComment) => dislikedComment.id === commentId
      );

      if (isDisliked) {
        user.dislikedComments = user.dislikedComments.filter(
          (dislikedComment) => dislikedComment.id !== comment.id
        );
        comment.dislikes = comment.dislikes - 1;
      }

      user.likedComments.push(comment);
      await user.save();

      comment.likes = comment.likes + 1;
      await comment.save();
    }
  }

  async unlike(commentId: string, userId: string) {
    const comment = await this.getById(commentId);
    const user = await userService.getUserWithLikedAndDislikedComments(userId);

    const isLiked = user.likedComments.find(
      (likedComment) => likedComment.id === commentId
    );

    if (isLiked) {
      user.likedComments = user.likedComments.filter(
        (likedComment) => likedComment.id !== comment.id
      );
      await user.save();

      comment.likes = comment.likes - 1;
      await comment.save();
    }
  }

  async dislike(commentId: string, userId: string) {
    const comment = await this.getById(commentId);
    const user = await userService.getUserWithLikedAndDislikedComments(userId);

    const isDisliked = user.dislikedComments.find(
      (dislikedComment) => dislikedComment.id === comment.id
    );

    if (!isDisliked) {
      const isLiked = user.likedComments.find(
        (likedComment) => likedComment.id === comment.id
      );

      if (isLiked) {
        user.likedComments = user.likedComments.filter(
          (likedComment) => likedComment.id !== comment.id
        );

        comment.likes = comment.likes - 1;
      }

      user.dislikedComments.push(comment);
      await user.save();

      comment.dislikes = comment.dislikes + 1;
      await comment.save();
    }
  }

  async undislike(commentId: string, userId: string) {
    const comment = await this.getById(commentId);
    const user = await userService.getUserWithLikedAndDislikedComments(userId);

    const isDisliked = user.dislikedComments.find(
      (dislikedComment) => dislikedComment.id === comment.id
    );

    if (isDisliked) {
      user.dislikedComments = user.dislikedComments.filter(
        (dislikedComment) => dislikedComment.id !== comment.id
      );
      await user.save();

      comment.dislikes = comment.dislikes - 1;
      await comment.save();
    }
  }

  async isDisliked(userId: string, commentId: string): Promise<boolean> {
    try {
      await User.createQueryBuilder("user")
        .leftJoin("user.dislikedComments", "dislikedComment")
        .where("user.id = :userId", { userId })
        .andWhere("dislikedComment.id = :commentId", { commentId })
        .getOneOrFail();
      return true;
    } catch (error) {
      return false;
    }
  }

  async isLiked(userId: string, commentId: string): Promise<boolean> {
    try {
      await User.createQueryBuilder("user")
        .leftJoin("user.likedComments", "likedComment")
        .where("user.id = :userId", { userId })
        .andWhere("likedComment.id = :commentId", { commentId })
        .getOneOrFail();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new CommentService();
