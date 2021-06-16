import axios from "axios";
import { useEffect, useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getTags() {
      const response = await axios.get("/api/tags");
      setTags(response.data);
      setIsLoading(false);
    }
    getTags();
  }, []);

  return (
    <ListGroup variant="flush" className="tags-list">
      <ListGroup.Item>
        <strong>Tags</strong>
      </ListGroup.Item>
      {isLoading ? (
        <Spinner animation="border" className="mx-auto mt-3" />
      ) : (
        tags.map(({ id, name }) => (
          <ListGroup.Item key={id}>
            <Link to={`/tag/${id}`}>{name}</Link>
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  );
}
