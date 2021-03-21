import Tag from "../models/Tag";

export default class PostDto {
  title: string;
  body: string;
  userId: string;
  tags: Tag[];
}
