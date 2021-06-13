import { Heart, Calendar, Bookmark, Trash } from "react-feather";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../services/authService";
import { useHistory } from "react-router";
import axios from "axios";

export default function Post({ data, getPosts }) {
  const { id, title, body, slug, likes, user, dateCreated } = data;
  const history = useHistory();
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [authUser, setAuthUser] = useState();
  const [likeCount, setLikeCount] = useState(likes);

  useEffect(() => {
    setAuthUser(authService.getAuthenticatedUser());
  }, []);

  useEffect(() => {
    if (authUser) {
      getIsLiked();
      getIsSaved();
    }
  }, [authUser]);

  async function getIsSaved() {
    setIsSaved(
      (
        await axios.post(`/api/posts/${id}/is-saved`, {
          userId: authUser.id,
        })
      ).data
    );
  }

  async function getIsLiked() {
    setIsLiked(
      (
        await axios.post(`/api/posts/${id}/is-liked`, {
          userId: authUser.id,
        })
      ).data
    );
  }

  async function deletePost() {
    await axios.delete(`/api/posts/${id}`);
    getPosts(true);
  }

  async function savePost() {
    await axios.post(`/api/posts/${id}/${isSaved ? "unsave" : "save"}`, {
      userId: authUser.id,
    });
    getIsSaved();
  }

  async function likePost() {
    if (authUser) {
      await axios.post(`/api/posts/${id}/${isLiked ? "unlike" : "like"}`, {
        userId: authUser.id,
      });
      await getIsLiked();
      isLiked ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
    } else {
      history.push("/login");
    }
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
        <button className="ml-auto like-button d-flex" onClick={likePost}>
          <Heart className={`${isLiked ? "text-danger" : ""}`} />
          <span className="ml-2">{likeCount}</span>
        </button>
        {authUser ? (
          <button
            className={`like-button ${isSaved ? "text-info" : ""}`}
            onClick={savePost}
          >
            <Bookmark />
          </button>
        ) : null}
      </Card.Footer>
    </Card>
  );
}
