import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import User from "../models/User";

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
