import { Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import authService from "../services/authService";
import { useHistory } from "react-router-dom";

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [userId, setUserId] = useState();

  const history = useHistory();

  async function handleCreatePost(e) {
    e.preventDefault();

    try {
      const { id, slug } = (
        await axios.post("/api/posts", {
          title,
          body,
          userId,
          tags: tags.split(","),
        })
      ).data;

      history.push(`/post/${slug}/${id}`);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  useEffect(() => {
    setUserId(authService.getAuthenticatedUser().id);
  }, []);

  return (
    <Layout>
      <form onSubmit={handleCreatePost}>
        <Card>
          <Card.Header as="h1" className="text-center">
            <input
              type="text"
              placeholder="Başlık"
              className="editor-header"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Card.Header>
          <Card.Body>
            <textarea
              rows="10"
              className="editor-input"
              placeholder="Paylaşım İçeriği"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </Card.Body>
          <Card.Footer className="text-muted">
            <input
              type="text"
              placeholder="Etiketler (teknoloji,yazilim)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="editor-input"
            />
          </Card.Footer>
        </Card>
        <Button type="submit" variant="primary" className="mt-3">
          Yayınla
        </Button>
      </form>
    </Layout>
  );
}
