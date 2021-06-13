import { useState, useEffect } from "react";
import authService from "../../services/authService";
import CommentCard from "./CommentCard";

export default function Comments({ data, getComments }) {
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    setAuthUser(authService.getAuthenticatedUser());
  }, []);

  return (
    <div>
      {data.map((comment) => (
        <CommentCard
          key={comment.id}
          getComments={getComments}
          comment={comment}
          authUser={authUser}
        />
      ))}
    </div>
  );
}
