import { LoginDto } from "../dto/authDto";
import userService from "./userService";
import bcrypt from "bcrypt";
import { ApiError } from "../config/ApiError";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Response } from "express";

class AuthService {
  async login(loginDto: LoginDto, res: Response): Promise<User> {
    const { email, password } = loginDto;
    const user = await userService.getByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Email or password is incorrect"
      );
    }

    const { id, firstName, lastName, dateCreated } = user;
    const token = jwt.sign(
      {
        firstName,
        lastName,
        email,
        dateCreated,
      },
      process.env.JWT_SECRET,
      { subject: id, expiresIn: "6h" }
    );

    await userService.saveToken(await bcrypt.hash(token, 10), user);

    res.cookie("token", token, { httpOnly: true });

    return user;
  }

  async logout(token: string, res: Response) {
    const payload = jwt.decode(token);
    const user = await userService.getById(payload.sub);
    await userService.removeToken(user);
    res.clearCookie("token");
  }
}

export default new AuthService();
