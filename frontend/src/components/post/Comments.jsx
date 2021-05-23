import React from "react";
import { Card } from "react-bootstrap";
import { ThumbsDown, ThumbsUp } from "react-feather";

export default function Comments() {
  return (
    <div>
      <Card className="mb-3">
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
        <Card.Footer>
          <ThumbsUp  />
          <ThumbsDown className="float-right" />
        </Card.Footer>
      </Card>
    </div>
  );
}
