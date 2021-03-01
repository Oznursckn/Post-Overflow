import User from "../models/User";
import bcrypt from "bcrypt";
import { getRepository } from "typeorm";

class UserService {
  async getAll() {
    return await User.find();
  }
  async save(body) {
    await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
      dateCreated: new Date(),
    }).save();
  }
  async getById(id: string) {
    return await User.findOne(id);
  }

  async delete(id: string) {
    await User.delete(id);
  }

  async update(id: string) {
    await getRepository(User).findOne(id);
    if (User) {
      getRepository(User).merge(User,req.body);
      getRepository(User).save(User);
    }
  }
}

export default new UserService();
