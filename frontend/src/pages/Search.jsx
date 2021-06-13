import Post from "../components/Post";
import News from "../components/News";
import { Row, Col, Button } from "react-bootstrap";
import Tag from "../components/Tags";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const { search } = useParams();

  useEffect(() => {
    async function getPosts() {
      let response = await axios.get("/api/posts", {
        params: {
          page,
          search,
        },
      });
      setNumberOfPages(response.data.numberOfPages);
      setPosts([...posts, ...response.data.data]);
    }
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
            <Post data={post} />
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
