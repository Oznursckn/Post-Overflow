import { MessageCircle, Heart, Calendar, Bookmark, Trash } from "react-feather";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../services/authService";
import axios from "axios";

export default function Post({ data, getPosts }) {
  const { id, title, body, slug, likes, user, dateCreated } = data;
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    setAuthUser(authService.getAuthenticatedUser());
  }, []);

  async function deletePost() {
    await axios.delete(`/api/posts/${id}`);
    getPosts(true);
  }

  async function savePost() {
    await axios.post(`/api/posts/${id}/save`, {
      userId: authUser.id,
    });
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="font-weight-bold d-flex">
          <Link to={`/post/${slug}/${id}`}>{title}</Link>
          {authUser && user.id === authUser.id ? (
            <span className="ml-auto">
              <button className="like-button text-danger" onClick={deletePost}>
                <Trash />
              </button>
            </span>
          ) : null}
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
        <button className="like-button" onClick={savePost}>
          <Bookmark />
        </button>
      </Card.Footer>
    </Card>
  );
}
