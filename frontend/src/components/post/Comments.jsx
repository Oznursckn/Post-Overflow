import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { ThumbsDown, ThumbsUp, Trash } from "react-feather";
import authService from "../../services/authService";

export default function Comments({ data, getComments }) {
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    setAuthUser(authService.getAuthenticatedUser());
  }, []);

  async function handleDeleteComment(commentId) {
    await axios.delete(`/api/comments/${commentId}`);
    getComments();
  }

  return (
    <div>
      {data.map(({ body, user, dateCreated, id }) => (
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
          <Card.Footer>
            <ThumbsUp />
            <ThumbsDown className="float-right" />
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}
