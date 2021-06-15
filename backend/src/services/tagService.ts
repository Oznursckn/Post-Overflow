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
        ` Could not find the tag for ID: ${id}`
      );
    }
    return tag;
  }

  async getByName(name: string) {
    return await Tag.findOneOrFail({ where: { name } });
  }
}

export default new TagService();
