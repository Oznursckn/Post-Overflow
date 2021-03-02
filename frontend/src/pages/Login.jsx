import { Card, Form, Button } from "react-bootstrap";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <Card className=" login-card shadow">
        <Card.Body>
          <h1 className="text-center mb-3">Giriş Yap</h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button className="w-100" variant="success" type="submit">
              Giriş Yap
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
