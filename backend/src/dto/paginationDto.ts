import Post from "../models/Post";

export default class PaginationDto {
  total: number;
  perPage: number;
  currentPage: number;
  numberOfPages: number;
  data: Post[];
}
