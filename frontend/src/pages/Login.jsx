import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import authService from "../services/authService";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await authService.login(email, password);
      history.push("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <div className="login-container">
      <Card className=" login-card shadow">
        <Card.Body>
          <h1 className="text-center mb-3">Giriş Yap</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group>
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

            <Form.Group>
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
            {error ? (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            ) : null}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
