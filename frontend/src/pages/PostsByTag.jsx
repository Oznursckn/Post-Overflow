import Post from "../components/Post";
import News from "../components/News";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import Tag from "../components/Tags";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router";

export default function PostsByTag() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const { id } = useParams();

  async function getPosts(reset) {
    setIsLoading(true);
    if (reset) {
      let response = await axios.get(`/api/tags/${id}/posts`, {
        params: {
          page: 1,
        },
      });
      setPage(1);
      setNumberOfPages(response.data.numberOfPages);
      setPosts(response.data.data);
      setIsLoading(false);
      return;
    }
    let response = await axios.get(`/api/tags/${id}/posts`, {
      params: {
        page,
      },
    });
    setNumberOfPages(response.data.numberOfPages);
    setPosts([...posts, ...response.data.data]);
    setIsLoading(false);
  }

  useEffect(() => {
    getPosts();
  }, [page]);

  useEffect(() => {
    getPosts(true);
  }, [id]);

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
          {isLoading ? (
            <Spinner animation="border" className="mx-auto my-5" />
          ) : null}
        </Col>
        <Col>
          <News />
        </Col>
      </Row>
    </Layout>
  );
}
