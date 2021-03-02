import User from "../models/User";
import bcrypt from "bcrypt";
import { UserDto } from "../dto/userDto";
import { ApiError } from "../config/ApiError";

class UserService {
  async getAll() {
    return await User.find();
  }

  async save(userDto: UserDto) {
    userDto.password = await bcrypt.hash(userDto.password, 10);
    await User.create({
      ...userDto,
      dateCreated: new Date(),
    }).save();
  }

  async getById(id: string) {
    const user = await User.findOne(id);
    if (!user) {
      throw new ApiError(404, `${id} id ye sahip kullanıcı bulunamadı`);
    }
    return user;
  }

  async delete(id: string) {
    const user = await this.getById(id);
    await User.delete(user);
  }

  async update(id: string, updateUserDto: Partial<UserDto>) {
    const user = await this.getById(id);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await User.update(user, updateUserDto);
  }
}

export default new UserService();
