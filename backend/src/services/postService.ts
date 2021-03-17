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
      likes: 0,
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

  async getLikedPostsByUserId(id: string) {
    return (await userService.getUserWithLikedPosts(id)).likedPosts;
  }

  async getSavedPostsByUserId(id: string) {
    return (await userService.getUserWithSavedPosts(id)).savedPosts;
  }

  async like(postId: string, userId: string) {
    if (!userId) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "userId boş olamaz");
    }

    const post = await this.getById(postId);
    const user = await userService.getUserWithLikedPosts(userId);

    const isLiked = user.likedPosts.find(
      (likedPost) => likedPost.id === post.id
    );

    if (!isLiked) {
      user.likedPosts.push(post);
      await user.save();

      post.likes = post.likes + 1;
      await post.save();
    }
  }

  async unlike(postId: string, userId: string) {
    if (!userId) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "userId boş olamaz");
    }

    const post = await this.getById(postId);
    const user = await userService.getUserWithLikedPosts(userId);

    const isLiked = user.likedPosts.find(
      (likedPost) => likedPost.id === post.id
    );

    if (isLiked) {
      user.likedPosts = user.likedPosts.filter(
        (likedPost) => likedPost.id !== post.id
      );
      await user.save();

      post.likes = post.likes - 1;
      await post.save();
    }
  }

  async savePost(postId: string, userId: string) {
    if (!userId) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "userId boş olamaz");
    }

    const post = await this.getById(postId);
    const user = await userService.getUserWithSavedPosts(userId);

    const isSaved = user.savedPosts.find(
      (savedPost) => savedPost.id === post.id
    );

    if (!isSaved) {
      user.savedPosts.push(post);
      await user.save();

      post.likes = post.likes + 1;
      await post.save();
    }
  }

  async unsavePost(postId: string, userId: string) {
    if (!userId) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "userId boş olamaz");
    }

    const post = await this.getById(postId);
    const user = await userService.getUserWithSavedPosts(userId);

    const isSaved = user.savedPosts.find(
      (savedPost) => savedPost.id === post.id
    );

    if (isSaved) {
      user.savedPosts = user.savedPosts.filter(
        (savedPost) => savedPost.id !== post.id
      );
      await user.save();

      post.likes = post.likes - 1;
      await post.save();
    }
  }
}

export default new PostService();
