import { Card, ListGroup } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNews() {
      let response = await axios.get("/api/news");
      setNews(response.data.filter(({ url }) => url !== null));
      setLoading(false);
    }
    getNews();
  }, []);
  return (
    <Card>
      <Card.Header>Son Haberler</Card.Header>
      <ListGroup variant="flush">
        {loading
          ? "loading"
          : news.map(({ id, title, url }) => (
              <a href={url} target="_blank" key={id}>
                <ListGroup.Item>{title}</ListGroup.Item>
              </a>
            ))}
      </ListGroup>
    </Card>
  );
}
