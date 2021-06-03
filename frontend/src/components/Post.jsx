import { MessageCircle, Heart, Calendar, Bookmark } from "react-feather";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Post({ data }) {
  const { id, title, body, slug, likes, user, dateCreated } = data;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="font-weight-bold">
          <Link to={`/post/${slug}/${id}`}>{title}</Link>
        </Card.Title>

        <Card.Text>
          {body.length > 300 ? `${body.substring(0, 301)}...` : body}
        </Card.Text>
        <div className="d-flex">
          <Link to={`/profile/${user.id}`}>
            <span className="text-muted">{`Yazar: ${user.firstName} ${user.lastName}`}</span>
          </Link>
          <span className="ml-auto text-muted d-flex align-items-center">
            <Calendar />
            <span className="ml-2">
              {new Date(dateCreated).toLocaleDateString()}
            </span>
          </span>
        </div>
      </Card.Body>
      <Card.Footer className="d-flex align-items-center">
        <MessageCircle />
        <button className="ml-auto like-button d-flex">
          <Heart />
          <span className="ml-2">{likes}</span>
        </button>
        <button className="like-button">
          <Bookmark />
        </button>
      </Card.Footer>
    </Card>
  );
}
