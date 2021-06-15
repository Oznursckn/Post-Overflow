import { StatusCodes } from "http-status-codes";
import { ApiError } from "../config/ApiError";
import { PostDto, PostQueryDto } from "../dto/postDto";
import Post from "../models/Post";
import userService from "./userService";
import Tag from "../models/Tag";
import User from "../models/User";
import tagService from "./tagService";
import slugify from "slugify";
import PaginationDto from "../dto/paginationDto";

class PostService {
  private getWithPagination(query: PostQueryDto) {
    const { search, page = 1 } = query;
    const take = 5;

    return Post.createQueryBuilder("post")
      .leftJoin("post.user", "user")
      .leftJoin("post.tags", "tag")
      .select([
        "post.id",
        "post.likes",
        "post.slug",
        "post.title",
        "post.body",
        "post.dateCreated",
        "user.id",
        "user.firstName",
        "user.lastName",
        "tag.id",
        "tag.name",
      ])
      .where(search ? "post.title ILIKE :search" : null, {
        search: `%${search}%`,
      })
      .take(take)
      .skip(page * take - take)
      .orderBy("post.dateCreated", "DESC");
  }

  async save(postDto: PostDto): Promise<Post> {
    const { body, tags, title, userId } = postDto;
    await userService.getById(userId);

    const postTags: Tag[] = [];

    for (let tag of tags) {
      if (tag) {
        tag = slugify(tag, { lower: true });
        try {
          postTags.push(await tagService.getByName(tag));
        } catch (error) {
          const newTag = new Tag();
          newTag.name = tag;
          postTags.push(newTag);
        }
      }
    }

    return await Post.create({
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
    const { page = 1 } = query;
    const take = 5;

    const [posts, count] = await this.getWithPagination(
      query
    ).getManyAndCount();

    const paginatedPostsDto: PaginationDto = {
      total: count,
      perPage: take,
      currentPage: page ? page : 1,
      numberOfPages: Math.ceil(count / take),
      data: posts,
    };

    return paginatedPostsDto;
  }

  async getAllByTag(query: PostQueryDto, tagId: string) {
    const { page = 1 } = query;
    const take = 5;

    const [posts, count] = await this.getWithPagination(query)
      .andWhere("tag.id = :tagId", { tagId })
      .getManyAndCount();

    const paginatedPostsDto: PaginationDto = {
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

  async getPostsByUserId(query: PostQueryDto, userId: string) {
    const user = await userService.getById(userId);

    const { page = 1 } = query;
    const take = 5;

    const [posts, count] = await this.getWithPagination(query)
      .andWhere("user.id = :id", { id: user.id })
      .getManyAndCount();

    const paginatedPostsDto: PaginationDto = {
      total: count,
      perPage: take,
      currentPage: page ? page : 1,
      numberOfPages: Math.ceil(count / take),
      data: posts,
    };

    return paginatedPostsDto;
  }

  async getLikedPostsByUserId(id: string) {
    return (await userService.getUserWithLikedPosts(id)).likedPosts;
  }

  async getSavedPostsByUserId(id: string) {
    return await (
      await userService.getUserWithSavedPosts(id)
    ).savedPosts;
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
      await post.save();
    }
  }

  async isSaved(userId: string, postId: string): Promise<boolean> {
    try {
      await User.createQueryBuilder("user")
        .leftJoin("user.savedPosts", "savedPost")
        .where("user.id = :userId", { userId })
        .andWhere("savedPost.id = :postId", { postId })
        .getOneOrFail();
      return true;
    } catch (error) {
      return false;
    }
  }

  async isLiked(userId: string, postId: string): Promise<boolean> {
    try {
      await User.createQueryBuilder("user")
        .leftJoin("user.likedPosts", "likedPost")
        .where("user.id = :userId", { userId })
        .andWhere("likedPost.id = :postId", { postId })
        .getOneOrFail();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new PostService();
