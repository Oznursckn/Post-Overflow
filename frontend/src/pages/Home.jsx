import Post from "../components/Post";
import News from "../components/News";
import { Row, Col, Button } from "react-bootstrap";
import Tag from "../components/Tags";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);

  async function getPosts(reset) {
    if (reset) {
      let response = await axios.get("/api/posts", {
        params: {
          page: 1,
        },
      });
      setPage(1);
      setNumberOfPages(response.data.numberOfPages);
      setPosts(response.data.data);
      return;
    }
    let response = await axios.get("/api/posts", {
      params: {
        page,
      },
    });
    setNumberOfPages(response.data.numberOfPages);
    setPosts([...posts, ...response.data.data]);
  }

  useEffect(() => {
    getPosts();
  }, [page]);

  return (
    <Layout>
      <Row>
        <Col>
          <Tag />
        </Col>
        <Col xs={6} className="d-flex flex-column">
          {posts.map((post) => (
            <Post key={post.id} data={post} getPosts={getPosts} />
          ))}
          {page >= numberOfPages ? null : (
            <Button onClick={() => setPage(page + 1)}>Daha fazla göster</Button>
          )}
        </Col>
        <Col>
          <News />
        </Col>
      </Row>
    </Layout>
  );
}
