import PostDto from "../dto/postDto";
import Post from "../models/Post";

class PostService {
  async getAll() {
    return Post.find();
  }

  async save(postDto: PostDto) {
    //console.log(postDto);
  }

  async getById(id: string) {
    return Post.findOne(id);
  }
}

export default new PostService();
