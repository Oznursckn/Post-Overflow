import User from "../models/User";
import bcrypt from "bcrypt";
import { UserDto, UpdateUserDto } from "../dto/userDto";
import { ApiError } from "../config/ApiError";
import { StatusCodes } from "http-status-codes";
import { plainToClass } from "class-transformer";

class UserService {
  async getAll() {
    return await User.find();
  }

  async save(userDto: UserDto) {
    const user = await User.findOne({ where: { email: userDto.email } });
    if (user) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "This email is already registered"
      );
    }
    userDto.password = await bcrypt.hash(userDto.password, 10);
    await User.create({
      ...userDto,
      likedPosts: [],
      dateCreated: new Date(),
    }).save();
  }

  async getByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async getById(id: string) {
    const user = await User.findOne(id);
    if (!user) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        ` Could not find the user for ID: ${id}`
      );
    }
    return user;
  }

  async delete(id: string) {
    const user = await this.getById(id);
    await User.delete(user.id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getById(id);

    if (updateUserDto.password) {
      if (!(await bcrypt.compare(updateUserDto.oldPassword, user.password))) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "The old password is incorrect "
        );
      }

      if (updateUserDto.password !== updateUserDto.passwordAgain) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Passwords must match");
      }

      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await User.update(user.id, updateUserDto);
  }

  async getUserWithLikedPosts(id: string) {
    const user = await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.likedPosts", "likedPost")
      .leftJoinAndSelect("likedPost.user", "postUser")
      .where("user.id = :id", { id })
      .getOne();

    if (!user) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `Could not find the user for ID: ${id} `
      );
    }
    return user;
  }

  async getUserWithSavedPosts(id: string) {
    const user = await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.savedPosts", "savedPost")
      .leftJoinAndSelect("savedPost.user", "postUser")
      .where("user.id = :id", { id })
      .getOne();

    if (!user) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `Could not find the user for ID: ${id} `
      );
    }
    return user;
  }

  async getUserWithLikedAndDislikedComments(id: string) {
    const user = await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.likedComments", "likedComment")
      .leftJoinAndSelect("user.dislikedComments", "dislikedComment")
      .leftJoinAndSelect("likedComment.user", "commentUser")
      .leftJoinAndSelect("dislikedComment.user", "dislikedCommentUser")
      .where("user.id = :id", { id })
      .getOne();

    if (!user) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `Could not find the user for ID: ${id} `
      );
    }
    return user;
  }

  async saveToken(token: string, user: User) {
    user.token = token;
    await user.save();
  }

  async removeToken(user: User) {
    user.token = null;
    await user.save();
  }
}

export default new UserService();
