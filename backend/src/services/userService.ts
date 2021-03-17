import User from "../models/User";
import bcrypt from "bcrypt";
import UserDto from "../dto/userDto";
import { ApiError } from "../config/ApiError";
import { StatusCodes } from "http-status-codes";

class UserService {
  async getAll() {
    return await User.find();
  }

  async save(userDto: UserDto) {
    const user = await User.findOne({ where: { email: userDto.email } });
    if (user) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Bu email adresi kullanılmaktadır"
      );
    }
    userDto.password = await bcrypt.hash(userDto.password, 10);
    await User.create({
      ...userDto,
      likedPosts: [],
      dateCreated: new Date(),
    }).save();
  }

  async getById(id: string) {
    const user = await User.findOne(id);
    if (!user) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `${id} id ye sahip kullanıcı bulunamadı`
      );
    }
    return user;
  }

  async delete(id: string) {
    const user = await this.getById(id);
    await User.delete(user.id);
  }

  async update(id: string, updateUserDto: Partial<UserDto>) {
    const user = await this.getById(id);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await User.update(user, updateUserDto);
  }

  private async getUserWithRelations(id: string, relations: string[]) {
    const user = await User.findOne(id, { relations });
    if (!user) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `${id} id ye sahip kullanıcı bulunamadı`
      );
    }
    return user;
  }

  async getUserWithLikedPosts(id: string) {
    return await this.getUserWithRelations(id, ["likedPosts"]);
  }

  async getUserWithSavedPosts(id: string) {
    return await this.getUserWithRelations(id, ["savedPosts"]);
  }

  async getUserWithLikedAndDislikedComments(id: string) {
    return await this.getUserWithRelations(id, [
      "likedComments",
      "dislikedComments",
    ]);
  }
}

export default new UserService();
