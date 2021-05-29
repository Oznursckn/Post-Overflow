import { Button, Card } from "react-bootstrap";
import React from "react";

export default function WritePost() {
  return (
    <div>
      <Card>
        <h1>
          <Card.Header className="text-center">Featured</Card.Header>
        </h1>
        <Card.Body>
          <h6>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
              With supporting text below as a natural lead-in to additional
              content. With supporting text below as a natural lead-in to additional
              content. With supporting text below as a natural lead-in to additional
            </Card.Text>
          </h6>
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          <Button variant="primary">Yayınla</Button>
          <Button className="ml-3" variant="success">
            Kaydet
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
