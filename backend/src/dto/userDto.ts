import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  ValidateIf,
} from "class-validator";
export class UserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  about: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ValidateIf((o) => o.password)
  @IsNotEmpty()
  @MinLength(6)
  passwordAgain: string;

  @ValidateIf((o) => o.password)
  @IsNotEmpty()
  @MinLength(6)
  oldPassword: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
