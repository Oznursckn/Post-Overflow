import Tag from "../models/Tag";
import { ApiError } from "../config/ApiError";
import { StatusCodes } from "http-status-codes";

class TagService {
  async getAll() {
    return await Tag.find();
  }

  async getById(id: string) {
    const tag = await Tag.findOne(id);
    if (!tag) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `${id} bu id ye sahip tag bulunamadı`
      );
    }
    return tag;
  }

  async getByName(name: string) {
    return await Tag.findOneOrFail({ where: { name } });
  }

  async getPosts(id: string) {
    const tagWithPosts = await Tag.createQueryBuilder("tag")
      .where("tag.id = :id", { id })
      .select([
        "tag.id",
        "tag.name",
        "post.id",
        "post.title",
        "post.slug",
        "post.dateCreated",
        "user.id",
        "user.firstName",
        "user.lastName",
        "user.email",
      ])
      .leftJoin("tag.posts", "post")
      .innerJoin("post.user", "user")
      .innerJoinAndSelect("post.tags", "tags")
      .getOne();

    return tagWithPosts.posts;
  }
}

export default new TagService();
