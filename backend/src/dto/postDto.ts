import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class PostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString({ each: true })
  tags: string[];
}

export class PostQueryDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search: string;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  page:number;
}
