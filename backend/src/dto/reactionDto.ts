import { IsNotEmpty, IsUUID } from "class-validator";

export class ReactionDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
