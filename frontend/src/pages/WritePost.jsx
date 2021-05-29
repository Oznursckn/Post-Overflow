import { Button, Card } from "react-bootstrap";
import React from "react";

export default function WritePost() {
  return (
    <form>
      <Card>
        <Card.Header as="h1" className="text-center">
          <input type="text" placeholder="Başlık" className="editor-header" required />
        </Card.Header>
        <Card.Body>
          <textarea
            rows="10"
            className="editor-input"
            placeholder="Paylaşım İçeriği"
            required
          />
        </Card.Body>
        <Card.Footer className="text-muted">
          <input
            type="text"
            placeholder="Etiketler (teknoloji,yazilim)"
            className="editor-input"
          />
        </Card.Footer>
      </Card>
      <Button type="submit" variant="primary" className="mt-3">
        Yayınla
      </Button>
    </form>
  );
}
