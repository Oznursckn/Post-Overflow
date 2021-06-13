import { Card } from "react-bootstrap";
import { ThumbsDown, ThumbsUp, Trash } from "react-feather";
import { useHistory } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

export default function CommentCard({ comment, getComments, authUser }) {
  const { body, user, dateCreated, id, likes, dislikes } = comment;
  const history = useHistory();
  const [isDisliked, setIsDisliked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);

  useEffect(() => {
    if (authUser) {
      getIsLiked();
      getIsDisliked();
    }
  }, [authUser]);

  async function handleDeleteComment() {
    await axios.delete(`/api/comments/${id}`);
    getComments();
  }

  async function getIsDisliked() {
    setIsDisliked(
      (
        await axios.post(`/api/comments/${id}/is-disliked`, {
          userId: authUser.id,
        })
      ).data
    );
  }

  async function getIsLiked() {
    setIsLiked(
      (
        await axios.post(`/api/comments/${id}/is-liked`, {
          userId: authUser.id,
        })
      ).data
    );
  }

  async function likeComment() {
    if (authUser) {
      await axios.post(`/api/comments/${id}/${isLiked ? "unlike" : "like"}`, {
        userId: authUser.id,
      });
      await getIsLiked();
      await getIsDisliked();
      if (isLiked) {
        setLikeCount(likeCount - 1);
      } else {
        if (isDisliked) {
          setDislikeCount(dislikeCount - 1);
        }
        setLikeCount(likeCount + 1);
      }
    } else {
      history.push("/login");
    }
  }

  async function dislikeComment() {
    if (authUser) {
      await axios.post(
        `/api/comments/${id}/${isDisliked ? "undislike" : "dislike"}`,
        {
          userId: authUser.id,
        }
      );
      await getIsDisliked();
      await getIsLiked();
      if (isDisliked) {
        setDislikeCount(dislikeCount - 1);
      } else {
        if (isLiked) {
          setLikeCount(likeCount - 1);
        }
        setDislikeCount(dislikeCount + 1);
      }
    } else {
      history.push("/login");
    }
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="d-flex">
          <span>
            {user.firstName} {user.lastName}
          </span>
          {authUser && authUser.id === user.id ? (
            <span className="ml-auto">
              <button
                className="like-button text-danger"
                onClick={() => {
                  handleDeleteComment(id);
                }}
              >
                <Trash />
              </button>
            </span>
          ) : null}
        </Card.Title>
        <Card.Text>{body}</Card.Text>
        <Card.Text className="text-muted">
          {new Date(dateCreated).toLocaleDateString()}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex">
        <button
          className="like-button d-flex align-items-center"
          onClick={likeComment}
          style={{ gap: 10 }}
        >
          <ThumbsUp className={`${isLiked ? "text-info" : ""}`} />
          <span>{likeCount}</span>
        </button>
        <button
          className="like-button ml-auto d-flex align-items-center"
          onClick={dislikeComment}
          style={{ gap: 10 }}
        >
          <span>{dislikeCount}</span>
          <ThumbsDown className={`${isDisliked ? "text-danger" : ""}`} />
        </button>
      </Card.Footer>
    </Card>
  );
}
