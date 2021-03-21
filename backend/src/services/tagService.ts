import Tag from "../models/Tag";
import TagDto from "../dto/tagDto";
import { ApiError } from "../config/ApiError";
import { StatusCodes } from "http-status-codes";

class TagService {
  async getAll() {
    return await Tag.find();
  }

  async getById(id: string) {
    const tag = await Tag.findOne(id, { relations: ["posts"] });
    if (!tag) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `${id} bu id ye sahip tag bulunamadı`
      );
    }
    return tag;
  }
}

export default new TagService();