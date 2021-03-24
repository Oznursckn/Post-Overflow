import { StatusCodes } from "http-status-codes";
import { ApiError } from "../config/ApiError";
import { PaginatedPostsDto, PostDto, PostQueryDto } from "../dto/postDto";
import Post from "../models/Post";
import userService from "./userService";
import { ILike } from "typeorm";
import Tag from "../models/Tag";
import tagService from "./tagService";
import slugify from "slugify";

class PostService {
  async save(postDto: PostDto) {
    const { body, tags, title, userId } = postDto;
    await userService.getById(userId);

    const postTags: Tag[] = [];

    for (let tag of tags) {
      tag = slugify(tag, { lower: true });
      try {
        postTags.push(await tagService.getByName(tag));
      } catch (error) {
        const newTag = new Tag();
        newTag.name = tag;
        postTags.push(newTag);
      }
    }

    await Post.create({
      title,
      body,
      slug: slugify(title, { lower: true }),
      likes: 0,
      tags: postTags,
      userId,
      dateCreated: new Date(),
    }).save();
  }

  async getAll(query: PostQueryDto) {
    const { search, page } = query;
    let where = {};

    if (search) {
      where = { title: ILike(`%${search}%`) };
    }
    const take = 5;

    const [posts, count] = await Post.findAndCount({
      relations: ["tags", "user"],
      order: { dateCreated: "DESC" },
      select: ["id", "likes", "slug", "title", "dateCreated"],
      where,
      take,
      skip: page * take - take,
    });

    const paginatedPostsDto: PaginatedPostsDto = {
      total: count,
      perPage: take,
      currentPage: page ? page : 1,
      numberOfPages: Math.ceil(count / take),
      data: posts,
    };

    return paginatedPostsDto;
  }

  async getById(id: string) {
    const post = await Post.findOne(id, { relations: ["user", "tags"] });
    if (!post) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `Could not find the post for ID: ${id}`
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
