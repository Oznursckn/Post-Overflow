import { MessageCircle, Heart } from "react-feather";
import { Card } from "react-bootstrap";

export default function Post({ data }) {
  return (
    <Card className="mb-3">
      <Card.Img
        variant="top"
        src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
      />
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>{data.body}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <MessageCircle />
        <Heart className="float-right" />
      </Card.Footer>
    </Card>
  );
}
