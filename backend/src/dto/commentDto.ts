import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  postId: string;
}
