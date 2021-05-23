
import Post from "../components/Post";
import News from "../components/News";
import PostPage from "../pages/PostPage";
import { Row, Col } from "react-bootstrap";
import Tag from "../components/Tags";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      let response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    }
    getPosts();
  }, []);

  return (
  
      <Row>
        <Col>
          <Tag />
        </Col>
        <Col xs={6}>
          {posts.map((post) => (
            <Post data={post}/>
          ))}
        </Col>
        <Col>
          <News />
        </Col>
      </Row>
    
  );
}
